
GetAllAccess()
function GetAllAccess() {
    var failed = db.ref('failedaccess')
    let faileds;

    failed.once('value')
        .then((result) => {
            if (result.exists()) {
                var fechas = Object.keys(result.val())
                for (var ii = 0; ii < fechas.length; ii += 1) {
                    var fecha = fechas[ii]

                    var elements = db.ref('failedaccess/' + fecha)
                    elements.on('child_added', result => {
                        console.log(result.val().codigo);
                        var fecha = result.ref;
                        var num = String(fecha).split('/')
                        faileds += `
                        <tr>
                            <td>${result.val().codigo}</td>
                            <td>${num[4]}</td>
                            <td>${result.val().horaIntento}</td>
                        </tr>
                        `
                        $('#users').html(faileds)
                    })
                }
            } else {
                console.log("no data");
            }

        }).catch((err) => {

        });
}

function OnlyAccess() {
    var fecha = $('#date').val()

    fecha = fecha.split('-')
    var dia = fecha[2]

    if (dia.charAt(0) === '0') {
        dia = dia.slice(1);
    }

    var mes = fecha[1]
    var anio = fecha[0]
    let users = '';


    var ref = dia + "-" + mes + '-' + anio

    console.log(ref);

    var onlyaccess = db.ref('failedaccess/' + ref)
    onlyaccess.once('value').then(result => {


        if (result.exists()) {
            var keys = Object.keys(result.val())

            for (var ii = 0; ii < keys.length; ii += 1) {
                var key = keys[ii]

                var alldata = db.ref('failedaccess/' + ref + '/' + key)
                alldata.once('value').then(result => {
                    users += `
                    <tr>
                        <td>${result.val().codigo}</td>
                        <td>${ref}</td>
                        <td>${result.val().horaIntento}</td>
                    </tr>
                    `
                    console.log(users);

                    $('#users').html(users)

                })
            }




        } else {
            users = `
            <tr>
                <td>Ningun dato encontrado</td>
            </tr>
            `
            $('#users').html(users)

        }
    }).catch((err) => {
        console.log(err);

    });
}