var request = require('request');
var dados = require('./dados');

module.exports = {
    startRobots: init,
    continueRobots: loadState,
    numRobots: changeRobotsCount,
    ticketType: alterTicketType
}

function init(label, index) {
    dados.start();
    var i = 0
    for (i; i < dados.num_robots; i++)
        callAPI(label, index, i);
}

function callAPI(label, index, robot_index) {
    atualizaTela();
    dados.updateUrl(robot_index);
    request(dados.robot(robot_index).url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var status = true;
            status = JSON.parse(body).status;
            if (status) {
                dados.setAfiliates(dados.afiliates.concat(JSON.parse(body).affiliate.filter(filtraRepetidos, dados.arrId(robot_index))));

                dados.resetArray(robot_index);
                dados.afiliates.forEach(function (item) {
                    dados.arrId(robot_index).push(item.id);
                });
            }
            dados.robot(robot_index).lat = (parseFloat(dados.robot(robot_index).lat) - 0.05).toString();

            if (parseFloat(dados.robot(robot_index).lat) > dados.robot(robot_index).max_lat) {
                callAPI(label, index, robot_index);
            }
            else if (parseFloat(dados.robot(robot_index).lon) < dados.robot(robot_index).max_lon) {
                dados.robot(robot_index).lat = '5.505303';
                dados.robot(robot_index).lon = (parseFloat(dados.robot(robot_index).lon) + 0.05).toString();
                dados.saveState();
                callAPI(label, index, robot_index);
            }
            else {
                console.log("Robo #%d concluido.", robot_index);
            }

            //console.log(body) // Show the HTML for the Google homepage.
            // console.log(dados.num_robots);

            // var i = 0;
            // setInterval(function () {
            //     process.stdout.write('\033c');
            //     console.log('huehue' + i++);
            // }, 1000);

        }
    })
}

function loadState() {
    
}

function changeRobotsCount() {
    
}

function alterTicketType() {
    
}

function filtraRepetidos(item) {
    return this.indexOf(item.id) == -1;
}

function atualizaTela() {
    process.stdout.write('\033c');
    for (var i = 0; i < dados.num_robots; i++)
        console.log('Robo #%d\n Latitude: %d\n Logintude: %d\n',
            i+1,
            dados.robot(i).lat,
            dados.robot(i).lon);
}