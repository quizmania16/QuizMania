const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({origin:'*'}));


app.post('/createQuiz', (req, res) => {
  const quiz = req.body;
  console.log("body ->",quiz);
  admin.firestore()
  .collection('quiz')
  .add(quiz)
  .then((doc) => {
    return res.json({message:`Document created ${doc.id} Successfully` })
  })
  .catch((err) => {
    res.status(500).json({error:"Something went wron"})
    console.log('error',err);
      })
});


app.get('/getQuiz/:quizId', (req, res) => {
  admin.firestore().collection('quiz').where("quiz_id","==",req.params.quizId)
    .get()
    .then((data) => {
      let allQuiz = [];
      data.forEach((doc) => {
        allQuiz.push(doc.data());
      });
      return res.json(allQuiz); 
    })
    .catch(err => console.log(err) )
});


exports.api = functions.https.onRequest(app);