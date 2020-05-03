const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const app = require("express")();

const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCnyVjyAndCwwSpAnZOTqMc3AI-JZXHjtE",
  authDomain: "quizmania-43a2e.firebaseapp.com",
  databaseURL: "https://quizmania-43a2e.firebaseio.com",
  projectId: "quizmania-43a2e",
  storageBucket: "quizmania-43a2e.appspot.com",
  messagingSenderId: "707801030069",
  appId: "1:707801030069:web:80d72d09576825a9bf0dfc",
  measurementId: "G-JYP03KG4XX",
};
firebase.initializeApp(firebaseConfig);

const cors = require("cors");
app.use(cors({ origin: "*" }));

const db = admin.firestore();

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  return false;
};

app.post("/signUp", (req, res) => {
  const newUser = req.body;

  var errors = {};

  if (isEmpty(newUser.email)) errors.email = "Must not be empty";
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (isEmpty(newUser.username)) errors.username = "Must not be empty";
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  let token, userId;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ errors: { handle: " is already taken" } });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        password: newUser.password,
        username: newUser.username,
        attempted_quiz: [],
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res
          .status(400)
          .json({ errors: { general: "Email already in use" } });
      }
      if (err.code === "auth/weak-password") {
        return res
          .status(400)
          .json({
            errors: { general: "Password must be minimum of 8 charecters" },
          });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

app.post("/signIn", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let errors = {};

  if (isEmpty(email)) errors.email = "Must not be empty";
  if (isEmpty(password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  let username = "";
  let token = "";
  // return db.doc(`/users/${newUser.handle}`).set(userCredentials);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((newToken) => {
      token = newToken;
      return db.collection("users").where("email", "==", email).get();
    })
    .then((data) => {
      data.forEach((doc) => {
        username = doc.data().username;
      });
      return res.status(200).json({ token, username });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/wrong-password")
        return res
          .status(403)
          .json({
            errors: { general: "Wrong credentials, please try again !" },
          });
      if (err.code === "auth/user-not-found")
        return res
          .status(403)
          .json({
            errors: { general: "User not registered, Please Sign Up !" },
          });
      return res.status(500).json({ error: err.code });
    });
});

app.get("/getResult/:username", (req, res) => {
  let users = {};
  db.collection("users")
    .where("username", "==", req.params.username)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        users = doc.data();
      });
      return res.json({ results: users });
    })
    .catch((err) => console.log(err));
});

app.put("/getUser/:username", (req, res) => {
  let users = {};
  db.collection("users")
    .where("username", "==", req.params.username)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        users = doc.data();
      });
      users.quiz_result = users.quiz_result ? users.quiz_result : [];
      users.quiz_result.push(req.body.result);
      return db.collection("users").doc(users.handle).set(users);
    })
    .then(() => {
      return res.json({ users });
    })
    .catch((err) => console.log(err));
});

app.post("/createQuiz", (req, res) => {
  const quiz = req.body;
  console.log("body ->", quiz);
  db.collection("quiz")
    .add(quiz)
    .then((doc) => {
      return res.json({ message: `Document created ${doc.id} Successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.log("error", err);
    });
});

app.get("/getAllQuiz", (req, res) => {
  db.collection("quiz")
    .get()
    .then((data) => {
      let allQuiz = [];
      data.forEach((doc) => {
        allQuiz.push(doc.data());
      });
      return res.json(allQuiz);
    })
    .catch((err) => console.log(err));
});

app.post("/getAllQuizResults", (req, res) => {  
  let quizname = req.body.quizname;
  let results= [];
  db.collection("users")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        let quiz_results = [];
        quiz_results = doc.data().quiz_result;
        quiz_results.map(
          (quizData) => {
            if(quizData.quiz === quizname){
              let userData = {}
              userData.username = doc.data().username;
              userData.results = quizData;
              results.push(userData)
            }
          })
      });

      return res.json(results);
    })
    .catch((err) => console.log(err));
});

app.get("/getAllQuiz/:username", (req, res) => {
  
  db.collection("quiz")
    .where("quiz_user", "==", req.params.username)
    .get()
    .then((data) => {
      let allQuiz = [];
      data.forEach((doc) => {
        allQuiz.push(doc.data());
      });
      return res.json(allQuiz);
    })
    .catch((err) => console.log(err));
});

app.get("/user/:email", (req, res) => {
  db.collection("users")
    .where("email", "==", req.params.email)
    .get()
    .then((data) => {
      let userData = [];
      data.forEach((doc) => {
        userData.push(doc.data());
      });
      return res.json(userData);
    })
    .catch((err) => console.log(err));
});

app.get("/getQuiz/:quizId", (req, res) => {
  db.collection("quiz")
    .where("quiz_id", "==", req.params.quizId)
    .get()
    .then((data) => {
      let allQuiz = [];
      data.forEach((doc) => {
        allQuiz.push(doc.data());
      });
      return res.json(allQuiz);
    })
    .catch((err) => console.log(err));
});

exports.api = functions.https.onRequest(app);
