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


function GetAssist() {
    var fecha = $('#date').val()

    fecha = fecha.split('-')
    var dia = fecha[2]
    var mes = fecha[1]
    var anio = fecha[0]


    let users = '';

    var entrada;
    var salida;
    var clave;
    var nombre;
    var apellido;

    var referencia = 'registro/' + dia + "-" + mes + "-" + anio
    console.log(referencia);

    var user = db.ref(referencia)

    user.once('value').then(function (data) {
        if (data.exists()) {
            console.log(data);


            var keys = Object.keys(data.val())

            for (var i = 0; i < keys.length; i += 1) {
                var infouser = db.ref(referencia + '/' + keys[i])

                infouser.once('value').then(function (data) {

                    if (data.exists()) {
                        entrada = data.val().entrada
                        salida = data.val().salida

                        var datauser = db.ref('empleado/' + data.key)
                        datauser.once('value').then(function (data) {
                            users += `
                            <tr>
                                <td>${data.key}</td>
                                <td>${data.val().nombre}</td>
                                <td>${data.val().apellido}</td>
                                <td>${entrada}</td>
                                <td>${salida}</td>
                            </tr>
                            `
                            document.getElementById('users').innerHTML = users

                        })
                    } else {
                        console.log("no data");
                    }

                })
            }

        } else {
            $('#myTable>tbody').empty();
            var notfound = '<tr class="danger" ><td>Ningun registro encontrado en ese día</td></tr>'
            document.getElementById('users').innerHTML = notfound

        }

    }).catch(err => {
        console.log(err);
        console.log("Ocurrio un error al traer los datos");
    });
}

