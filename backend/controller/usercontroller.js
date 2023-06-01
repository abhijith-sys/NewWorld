const express = require('express');
const router = express.Router();
const auth = require('./firebaseAdmin');

router.post('/signin-callback', async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Perform any additional backend processing or authentication checks
    // You can store the user's UID in your database or perform other actions

    res.sendStatus(200);
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
