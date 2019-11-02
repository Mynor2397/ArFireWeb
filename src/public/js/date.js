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




var info = $('#infoEmpleado').val()
if (info == '') {
    $('#infoEmpleado').html('Seleccione')
}



GetAllUsers()
async function GetAllUsers() {
    var user = db.ref("empleado");
    let users = '';

    await user.on("child_added", data => { // esto me
        console.log(data);
        
        users += `
        <tr Empleadoid="${data.key}" id="empleado"  namempleado="${data.val().nombre}"class="pas">
        <td>${data.val().nombre}</td>
            <td>${data.val().apellido}</td>
            <td>${data.key}</td>
            </tr>
        `
        console.log(data.val());
        document.getElementById('users').innerHTML = users
    })
}

$(document).on('click', '#empleado', async function () {
    var storage = firebase.storage().ref("imgs")

    let element = $(this)[0];
    console.log(element);
    
    let id = $(element).attr('Empleadoid')
    
   await storage.child(id + '.jpg').getDownloadURL().then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        
        var img = document.getElementById('myimg');
        img.src = url;
    }).catch(function (error) {
        
    });
    
    let name = $(element).attr('namempleado')
    $('#infoEmpleado').html(name)
})
