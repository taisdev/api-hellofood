const admin = require('firebase-admin');
const serviceAccount = require('./permission.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
