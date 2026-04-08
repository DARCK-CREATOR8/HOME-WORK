const express = require("express")
const session = require("express-session")
const app = express()
const webpush = require("web-push")
const User = require("./models/User.js")
const Work = require("./models/Work.js")
const Notification = require("./models/Notification.js")
const Subscription = require("./models/Subscription.js")
const mongoose = require("mongoose");
const urlDb = "mongodb+srv://DARCK-CREATOR:dbDarckCreator@home-work.umdhohl.mongodb.net/schoolDB"
mongoose.connect("mongodb+srv://DARCK-CREATOR:dbDarckCreator@home-work.umdhohl.mongodb.net/schoolDB")
.then(() => console.log("MongoDB connecté ✅"))
webpush.setVapidDetails(
    "mailto:danielluzumu12@gmail.com",
    "BIo_hsQ3pb93rTa8kjU1DjCjJZ1tMlGZ3YflnxJJLps0PrTpqwa5yqISByjZ-RiY7Tm14oiMDQDwuk7uQjhMR2s",
    "eExjt7ZaphPRWzO4NqjIsgCmPC1lY97ipmKx_pOOIZ4"
)
const PORT = 3000
app.use(session({
  secret: "monsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: "lax",
    httpOnly: true,
  }
}));
app.use(express.json())
app.use(express.static("public"))
.catch(err => console.log("Erreur connexion  a MongoDb:", err));
app.post('/register', async (req, res) => {
  try{
    const {name,email,password,number,role} = req.body;
    const newUser = new User({
      name,
      email,
      password,
      number,
      role
    });
    await newUser.save()
    res.status(201).json({
      message : "Utlisateurs creer",
      role: newUser.role
    })
  }
  catch (error){
    res.status(500).json({
      message : `Erreur serveur ${error}`
    })
  }
});
app.post("/login", async (req, res) => {
  try{
    const {email,password} = req.body
    const user = await User.findOne({email,password})
    if(!user){
      return res.status(401).json({message: "Erreur mot de passe ou email incorrect"});
    }
    req.session.userId = user._id
    req.session.role = user.role
    res.status(200).json({
      message: "Connexion reussite !",
      role: user.role
    });
  }
  catch (error){
    res.status(500).json({
      message: "Erreur serveur !"
    })
  }
});
app.get("/all-user", async (req,res) => {
  const users = await User.find()
  res.json(users)
})
app.get("/students", async (req,res) => {
  try{
    const student = await User.find({role: "eleve"})
    res.status(200).json(student)
  }
  catch (error){
   res.status(500).json({
     message : "Erreur serveur"
   })
  }
})
app.post("/works", async (req,res) => {
  try {
    if(!req.session.userId) {
      return res.status(401).json({message: "non autoriser"})
    }
    if (req.session.role !== "professeur") {
      return res.status(403).json({message: "Accé refuser !"})
    }
  const {title, note, classe, deadline, description,type} = req.body;
  const newWork = new Work({
    title,
    note,
    classe,
    deadline,
    description,
    type,
    teacher: req.session.userId
  });
  await newWork.save()
  const students = await User.find({
    role: "eleve"
  })
  const teacher = await User.findById(req.session.userId).select("name")
  for(const student of students){
  await  Notification.create({
      user: student._id,
      work: newWork._id,
      type: newWork.type,
      title: newWork.title
    })
    
  }
  const subscriptions = await Subscription.find()
  const pushResult = {sent: 0, failid: 0, expired: 0}
  if (subscriptions.length > 0) {
    const payload = JSON.stringify({
    title: `${teacher.name} a publié un/e ${type}`,
    body: `${title} - ${type} - ${classe}`,
    data : {
      workId: newWork._id,
      teacher: teacher.name,
      deadline: deadline,
      type: type
    },
    actions: [
      {
        action: "view",
        title: "Voir le devoir"
      },
      {
        action: "later",
        title: "plus tard"
      }
      ]
    });
    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(sub,payload)
        pushResult.sent++
      } catch (err) {
        if (err.statusCode === 401) {
          Subscription.deleteOne({_id: sub._id})
          pushResult.expired++
        } else {
          pushResult.failid++
        }
      }
    }
  }
  res.status(201).json({
    success: true,
    message : "Devoirs envoyer avec succé !",
    work: newWork,
    notifications: {
      total: subscriptions.length,
      sent: pushResult.sent,
      expired: pushResult.expired
    }
  })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du devoirs",
      error: error.message
    })
  }
})
app.get("/works", async (req,res) => {
  try {
    
  if (!req.session.userId) {
    return res.status(401).json({message: "Non autoriser !"})
  }
  const works = await Work.find().populate("teacher","name").sort({createdAt: -1})
  res.json(works)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: "Erreur serveur"})
  }
})
app.get("/me", async (req,res) => {
  try {
    if(!req.session.userId){
      return res.status(401).json({message: "Utilisateur non connecter !...."})
    }
    const user = await User.findById(req.session.userId).select("-password")
    if (!user) {
      res.status(404).json({message: "Utilisateurs introuvable ! "})
    }
    res.json(user)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message:"Erreur serveur"})
  }
})
app.get("/notifications", async (req,res) =>{
  if (!req.session.userId) {
  return res.status(401).json({ message: "Non autorisé" });
}
  try{
    const notifications = await Notification.find({user: req.session.userId}).populate("work").sort({createdAt: -1})
    res.json(notifications)
    console.log(notifications)
  }
  catch (error)  {
    res.status(500).json({message: "Erreur serveur !"})
  }
})
app.post("/subscribe", async (req, res) => {
    try {
        const subscription = req.body
        const newSub = new Subscription(subscription)
        await newSub.save()
        console.log("✅ Abonnement sauvegardé en BD")
        res.status(201).json({message: "Abonnement enregistre avec succé"})
    } catch (error) {
        console.error("❌", error)
        res.status(500).json({message: "Erreur"})
    }
})
app.post("/send-notification", async (req, res) => {
    const { title, body } = req.body;

    const payload = JSON.stringify({
        title: title || "Nouvelle notification",
        body: body || "Vous avez un nouveau message",
        timestamp: Date.now()
    });

    try {
      
        const subscriptions = await Subscription.find();
        console.log(`📱 ${subscriptions.length} abonnements trouvés en BD`);

        if (subscriptions.length === 0) {
            return res.json({ message: "Aucun abonnement trouvé en BD" });
        }

        let successCount = 0;
        let failCount = 0;

        for (const sub of subscriptions) {
            try {
                await webpush.sendNotification(sub, payload);
                successCount++;
                console.log(`✅ Envoyé à ${sub.endpoint.substring(0, 30)}...`);
            } catch (err) {
                if (err.statusCode === 410) {
                  
                    await Subscription.deleteOne({ _id: sub._id });
                    console.log(`❌ Abonnement expiré supprimé: ${sub._id}`);
                    failCount++;
                } else {
                    console.error(`❌ Erreur: ${err.message}`);
                    failCount++;
                }
            }
        }

        res.json({
            message: "Notifications traitées",
            success: successCount,
            failed: failCount,
            total: subscriptions.length
        });

    } catch (error) {
        console.error("❌ Erreur send-notification:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
app.get("/test-push", async (req, res) => {
    const payload = JSON.stringify({
        title: "Test Notification",
        body: "Ça fonctionne 🔥"
    });

    try {
        const subscriptions = await Subscription.find(); 
        console.log("📱 Abonnements en BD:", subscriptions.length);

        await Promise.all(
            subscriptions.map(sub =>
                webpush.sendNotification(sub, payload).catch(async (err) => {
                    if (err.statusCode === 410) {
                        await Subscription.deleteOne({ _id: sub._id });
                    }
                })
            )
        );

        res.send(`Notification envoyée à ${subscriptions.length} abonnés !`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur push");
    }
});
app.get("/push-client", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Push Notifications</title>
        </head>
        <body>
            <h1>Test Push Notifications</h1>
            <button onclick="requestPermission()">Activer les notifications</button>
            
            <script>
                async function requestPermission() {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        registerServiceWorker();
                    }
                }
                
                async function registerServiceWorker() {
                    try {
                        const registration = await navigator.serviceWorker.register('/sw.js');
                        console.log('Service Worker enregistré');
                        
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BIo_hsQ3pb93rTa8kjU1DjCjJZ1tMlGZ3YflnxJJLps0PrTpqwa5yqISByjZ-RiY7Tm14oiMDQDwuk7uQjhMR2s')
                        });
                        
                        // Envoyer au serveur
                        await fetch('/subscribe', {
                            method: 'POST',
                            body: JSON.stringify(subscription),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        
                        alert('Notifications activées !');
                        
                    } catch (error) {
                        console.error('Erreur:', error);
                    }
                }
                
                function urlBase64ToUint8Array(base64String) {
                    const padding = '='.repeat((4 - base64String.length % 4) % 4);
                    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
                    const rawData = window.atob(base64);
                    const outputArray = new Uint8Array(rawData.length);
                    for (let i = 0; i < rawData.length; ++i) {
                        outputArray[i] = rawData.charCodeAt(i);
                    }
                    return outputArray;
                }
            </script>
        </body>
        </html>
    `);
});




app.listen(PORT,() => {
  console.log(`le serveur est demarer sur le port ${PORT}`)
})

