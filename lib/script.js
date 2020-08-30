// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPjqHBSq4IvK8En59bUnGOnSuZg7L9ZYs",
  authDomain: "users-by-mail-20200825.firebaseapp.com",
  databaseURL: "https://users-by-mail-20200825.firebaseio.com",
  projectId: "users-by-mail-20200825",
  storageBucket: "users-by-mail-20200825.appspot.com",
  messagingSenderId: "587029595463",
  appId: "1:587029595463:web:528cb1c2176e30f8fd7862",
  measurementId: "G-0857DMH4JX"
};
// Initialize Firebase
//var project = 
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//console.log(project);

function send(){
  var email=document.getElementById('email').value;
  var pass=document.getElementById('pass').value;
  //alert("email="+email+" pass="+pass);
  auth(email, pass);
}

function login(){
  var email=document.getElementById('emailL').value;
  var pass=document.getElementById('passL').value;
  //alert("email="+email+" pass="+pass);
  signIn(email, pass);
}

function signIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

function verifyEmail(){
  var user = firebase.auth().currentUser;

  user.updateEmail("user@example.com").then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}

function auth(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      verifyEmail();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
  });
}

function logout(){
  firebase.auth().signOut()
  .then(function(){
    console.log('salir');
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

function checkUserState(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymus = user.isAnonymus;
      var uid = user.uid;
      var providerData = user.providerData;
      var txtVerfied="";
      if (emailVerified===false){
        txtVerfied="Email no verificado";
      }else{
        txtVerfied="Correo Verificado";
      }
      document.getElementById('loggedin').innerHTML=
      `<p>Conectado  ` + user.email + ` `+ txtVerfied + `</p>`+
        `<button onclick="logout()">Cerrar Sesión</button>`;
      console.log(user);
    } else {
      document.getElementById('loggedin').innerHTML="Pendiente por hacer Login" ;
    }
  });
}
