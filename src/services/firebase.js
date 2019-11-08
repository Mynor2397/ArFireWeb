var firebaseConfig = {
    apiKey: "AIzaSyAwAphNUl84U0IXwMlU_2czwv0loOOOR6U",
    authDomain: "esp8266-b25ef.firebaseapp.com",
    databaseURL: "https://esp8266-b25ef.firebaseio.com",
    projectId: "esp8266-b25ef",
    storageBucket: "esp8266-b25ef.appspot.com",
    messagingSenderId: "388176712607",
    appId: "1:388176712607:web:5bbd67bda6f2436eb9a3aa",
    measurementId: "G-HXC1766RVM"
};
//------------------------------------------------------------------------------------------
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/// Esta variable me permite realizar consultas a mi base de datos
var db = firebase.database()
// console.log(db);

