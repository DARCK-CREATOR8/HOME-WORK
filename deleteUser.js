const mongoose = require('mongoose');
const User = require('./models/User.js'); // chemin vers ton model
const Work = require('./models/Work.js'); // chemin vers ton model
const Notification = require('./models/Notification.js'); // chemin vers ton model

const urlDb = "mongodb+srv://DARCK-CREATOR:dbDarckCreator@home-work.umdhohl.mongodb.net/schoolDB";

mongoose.connect(urlDb)
  .then(async () => {
    console.log("MongoDB connecté ✅");

    // Supprimer tous les users
    const result = await User.deleteMany({});
    const resulte = await Work.deleteMany({});
    const results = await Notification.deleteMany({});
    console.log(`✅ ${result.deletedCount}   ${resulte.deletedCount}  ${results.deletedCount} utilisateurs supprimés`);

    process.exit(0);
  })
  .catch(err => {
    console.error("Erreur connexion MongoDB:", err);
    process.exit(1);
  });