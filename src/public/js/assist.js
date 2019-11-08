function GetAssist() {
    var fecha = $('#date').val()

    fecha = fecha.split('-')

    var dia = fecha[2]

    if (dia.charAt(0) === '0') {
        dia = dia.slice(1);
    }

    var mes = fecha[1]
    var anio = fecha[0]


    let users = '';

    var entrada;
    var salida;


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
                            <tr  Empleadoid="${data.key}" id="empleado"  namempleado="${data.val().nombre}"class="pas">
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
        console.log(error);
    });

    let name = $(element).attr('namempleado')
    $('#infoEmpleado').html(name)
})
