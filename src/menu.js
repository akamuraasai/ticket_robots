var Menu = require('terminal-menu');
var menu = Menu({ width: 60, x: 2, y: 2 });
var helpers = require('./helpers');

module.exports = {
    show: showMenu
}

function showMenu() {
    cabecalho();
    opcoes();

    process.stdin.pipe(menu.createStream()).pipe(process.stdout);
    process.stdin.setRawMode(true);
}

function cabecalho() {
    menu.reset();
    menu.write('Ticket Robots\n');
    menu.write('-------------------------\n');

}

function opcoes() {
    menu.add('Change # of Robots', helpers.numRobots);
    menu.add('Change Ticket Type', helpers.ticketType);
    menu.add('Start New Collect', helpers.startRobots);
    menu.add('Continue From Previous', helpers.continueRobots);
    menu.add('EXIT');

}

menu.on('select', function (label) {
    menu.reset();
    menu.close();
});

menu.on('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
    process.stdout.write('\033c');
});