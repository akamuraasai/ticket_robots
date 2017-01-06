if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

if (localStorage.getItem('num_robots') == undefined)
    localStorage.setItem('num_robots', 4);

if (localStorage.getItem('lat') == undefined)
    localStorage.setItem('lat', -23.5439707);

if (localStorage.getItem('lon') == undefined)
    localStorage.setItem('lon', -46.6446398);

if (localStorage.getItem('produto') == undefined)
    localStorage.setItem('produto', 'TAE');

var num_robots = Number(localStorage.getItem('num_robots')),
    limite = '50000',
    offset = '1',
    produto = localStorage.getItem('produto'),
    radius = '10000',
    token = 'MkM5RUUyNkYzRkQ5OEM1MTAxM0ZFMjg0QTdGNTBGNTItTW9uIEp1bCAxNSAxMDoyODowMCBCUlQgMjAxMw==',
    url_base = 'http://www.ticket.com.br/portal-web/affiliatenetwork/localizacao/json?buscaEnderecoNome=&',
    afiliados = [],
    idsArr = [],
    robots = [];

//05.505303
//-32.897866

//-74.235300
//-34.609640
function startAPICaller() {
    makeRobots();
    startRobots();
    startArrays();
}

function makeRobots() {
    if (num_robots == 1)
        robots.push({lat: '05.505303', max_lat: '-32.897866', lon: '-74.235300', max_lon: '-34.609640', url: ''});

    else if (num_robots == 2)
        robots.push({lat: '05.505303', max_lat: '-32.897866', lon: '-74.235300', max_lon: '-54.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-54.235300', max_lon: '-34.609640', url: ''});

    else if (num_robots == 4)
        robots.push({lat: '05.505303', max_lat: '-32.897866', lon: '-74.235300', max_lon: '-64.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-64.235300', max_lon: '-54.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-54.235300', max_lon: '-44.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-44.235300', max_lon: '-34.609640', url: ''});

    else if (num_robots == 8)
        robots.push({lat: '05.505303', max_lat: '-32.897866', lon: '-74.235300', max_lon: '-69.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-69.235300', max_lon: '-64.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-64.235300', max_lon: '-59.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-59.235300', max_lon: '-54.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-54.235300', max_lon: '-49.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-49.235300', max_lon: '-44.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-44.235300', max_lon: '-39.235300', url: ''},
                    {lat: '05.505303', max_lat: '-32.897866', lon: '-39.235300', max_lon: '-34.609640', url: ''});
}

function startRobots() {
    for (var i = 0; i < num_robots; i++)
        setTheURLForAll(i);
}

function startArrays() {
    for (var i = 0; i < num_robots; i++)
        idsArr[i] = [];
}

function list()
{
    //if (!$scope.prosseguir) return;

}

function returnArrIds(index) {
    return idsArr[index];
}

function getRobot(index) {
    return robots[index];
}

function setTheURLForAll(index) {
    var lat = robots[index].lat,
        lon = robots[index].lon;

    robots[index].url = `${url_base}lat=${lat}&limit=${limite}&lon=${lon}&offset=${offset}&product=${produto}&radius=${radius}&token=${token}`;
}

function cleanArray(index) {
    idsArr[index] = [];
}

function save() {
    localStorage.setItem('state_robots', JSON.stringify(robots));
    localStorage.setItem('afiliates', JSON.stringify(afiliados));
    //$scope.addRede();
}

function updateThisNetworkForMe(values) {
    afiliados = values;
}

module.exports = {
    start: startAPICaller,
    num_robots: num_robots,
    afiliates: afiliados,
    setAfiliates: updateThisNetworkForMe,
    arrId: returnArrIds,
    robot: getRobot,
    updateUrl: setTheURLForAll,
    resetArray: cleanArray,
    saveState: save
}
