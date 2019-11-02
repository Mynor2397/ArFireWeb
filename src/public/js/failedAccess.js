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


async function GetAllUsers() {
    var fecha = $('#date').val()

    fecha = fecha.split('-')
    var dia = fecha[2]
    var mes = fecha[1]
    var anio = fecha[0]

    console.log("i");
    
    var referencia = anio + "/" + mes + "/" + dia
    var fechatable = dia + "/" + mes + "/" + anio


    var user = db.ref("failedaccess/" + referencia);
    let users = '';

    await user.on("child_added", data => { // esto me

        users += `
        <tr>
            <td>${data.val().codigo}</td>
            <td>${fechatable}</td>
            <td>${data.val().horaIntento}</td>
        </tr>
        `

        if (data.val().codigo == undefined) {
            let alert = `
                <tr>
                    <td>Ningun intento de acceso encontado</td>
                </tr>
                `
            document.getElementById('users').innerHTML = alert
            return
        }

        document.getElementById('users').innerHTML = users
    })
}
getAllFailedUSer();

function getAllFailedUSer() {
    var failed = db.ref('failedaccess')

    failed.once('value')
        .then((result) => {
            if (result.exists()) {
                var keys = Object.keys(result.val())
                for (var i = 0; i < keys.length; i += 1) {

                    var anios = keys[i]
                    var anio = db.ref('failedaccess/' + anios) ///consulta a los años

                    anio.once('value')
                        .then(result => {
                            if (result.exists()) {
                                var keyst = Object.keys(result.val())
                                for (var ii = 0; ii < keyst.length; ii += 1) {
                                    var meses = keyst[ii]
                                    var mes = db.ref('failedaccess/' + anios + '/' + meses) //consulta a los  mesese

                                    mes.once('value')
                                        .then(result => {
                                            if (result.exists()) {

                                                var dias = Object.keys(result.val())
                                                console.log(result.val());
                                                console.log("Estos son los dias", Object.keys(result.val()));

                                                for (var d = 0; d < dias.length; d += 1) {
                                                    var dia = dias[d]
                                                    var days = db.ref('failedaccess/' + anios + '/' + meses + '/' + dia) //accesso a los dia

                                                    days.on('value', function(snapshot) {
                                                        console.log(snapshot.val());
                                                        
                                                      });
                                                    days.once('value')
                                                        .then(result => {
                                                            if (result.exists()) {
                                                                var claves = Object.keys(result.val())

                                                                for (var c = 0; c < claves.length; c += 1) {
                                                                    var clave = claves[c]

                                                                    var days = db.ref('failedaccess/' + anios + '/' + meses + '/' + dia + '/' + clave) //accesso a los dia

                                                                }


                                                            } else {
                                                                console.log('No data dias');

                                                            }
                                                        })
                                                }

                                            } else {
                                                console.log('No data mes');

                                            }
                                        })
                                }
                            } else {
                                console.log('No data anios');

                            }
                        })
                }

            } else {
                console.log("no data");

            }
        }).catch((err) => {
            console.log(err);
        });

}