console.log('SOCKET starting ...');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');
var rd = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}
app.use(require('express-status-monitor')())

var CLIENTS = {};
var ROOMS = {};
var MAX = 100;
var MAXROW = 10;
var LASTIDS = {};
var BOARDS = {};

var checkTwiceAgree = (roomId) => {
    if (typeof ROOMS[roomId] === 'undefined') {
        return false;
    }
    var agree = true;
    ROOMS[roomId].map((userId) => {
        if(!CLIENTS[userId].agree)
            agree = false;
    });
    return agree;
}
var getAlias = (index) => {
    let abc = 'XONMABCDEFGHIJ';
    return abc[index];
}
var reg = (data, client) => {
    CLIENTS[data.userId] = {
        userName: data.userName,
        client: client,
        alias: getAlias(ROOMS[data.roomId].length),
        agree: false
    };
    if (typeof ROOMS[data.roomId] !== 'undefined') {
        ROOMS[data.roomId].push(data.userId);
    } else {
        ROOMS[data.roomId] = [data.userId];
    }
    client.emit('regSuccess');
    let roomData = getRoomInfo(data.roomId);
    ROOMS[data.roomId].map((userId)=>{
        CLIENTS[userId].client.emit('fetchRoomInfoSuccess', roomData);
    });
}
var getScore = (alias, roomId) => {
    let score = 0;
    BOARDS[roomId].map((row)=>{
        row.map(node=>{
            if(node.value === alias) {
                score++;
            }
        })
    })
    return score;
}
var getRoomInfo = (roomId) => {
    if (typeof ROOMS[roomId] === 'undefined') {
        return {
            clients: []
        }
    }
    var score = {};
    var clients = ROOMS[roomId].map((userId) => {
        score[userId] = getScore(CLIENTS[userId]['alias'], roomId);
        return {
            userId: userId,
            userName: CLIENTS[userId]['userName'],
            alias: CLIENTS[userId]['alias'],
            agree: CLIENTS[userId]['agree']
        };
    })

    return {
        clients,
        board: BOARDS[roomId],
        score
    }
}

var generateBoard = () => {
    var coin = [];
    for(i = 1;i <= MAX; i++ ){
        coin.push(i);
    };
    var loop = 1000;
    while(loop > 0) {
        var x = rd(0, MAX - 1);
        var y = rd(0, MAX - 1);
        var tmp = coin[x];
        coin[x] = coin[y];
        coin[y] = tmp;
        loop--;
    }

    var board = [];
    for (i = 0; i < MAXROW; i++) {
        var row = [];
        for (j = 0; j < MAXROW; j++) {
            row.push({
                number: coin[(i*MAXROW) + j],
                value: ''
            });
        }

        if(i === MAXROW - 1)
            row.push({
                number: MAX + 1,
                value: ''
            });

        board.push(row);
    }
    return board;
}

var tick = (node, userId, roomId) => {
    if(node.number !== LASTIDS[roomId] + 1) {
        return;
    }
    if(ROOMS[roomId].indexOf(userId) !== -1) {
        BOARDS[roomId].map((row)=>{
            row.map((_node)=>{
                if(_node.number === node.number) {
                    _node.value = CLIENTS[userId].alias;
                    LASTIDS[roomId]++;
                }
            })
        });
    }
}

var resetRoom = (data) => {
    if(typeof ROOMS[data.roomId] !== 'undefined') {
        if(ROOMS[data.roomId].indexOf(data.userId) !== -1) {
            // reset value
            LASTIDS[data.roomId] = 0;
            // reset board
            BOARDS[data.roomId] = generateBoard();
            ROOMS[data.roomId].map((userId)=>{
                CLIENTS[userId].score = 0;
            });
        }
    }
}

io.on('connection', function(client) {
    // console.log('a user connected');
    // console.log(client);

    client.on('createUserId', function() {
        var userId = shortid.generate();
        client.emit('createUserIdSuccess', {
            userId: userId
        });
    });

    client.on('createRoom', function() {
        var userId = shortid.generate();
        var roomId = shortid.generate();
        ROOMS[roomId] = [];
        BOARDS[roomId] = [];
        LASTIDS[roomId] = 0;
        client.emit('createRoomSuccess', {
            userId: userId,
            roomId: roomId
        });
        console.log('CREATE ROOM: ' + roomId)
    });

    client.on('reg', function(data) {
        reg(data, client);
    });

    client.on('fetchRoomInfo', function(data) {
        client.emit('fetchRoomInfoSuccess', getRoomInfo(data.roomId))
    });

    client.on('playSignal', function(data) {
        CLIENTS[data.userId].agree = true;
        if (checkTwiceAgree(data.roomId)) {
            BOARDS[data.roomId] = generateBoard();
            ROOMS[data.roomId].map((userId)=>{
                CLIENTS[userId].client.emit('playSignalSuccess', getRoomInfo(data.roomId));
            });
        }
    });


    client.on('tick', function(data) {
        tick(data.node, data.userId, data.roomId);
        let roomData = getRoomInfo(data.roomId);
        ROOMS[data.roomId].map((userId)=>{
            CLIENTS[userId].client.emit('tickSuccess', roomData);
        });
        if(MAX + 1 === LASTIDS[data.roomId]) {
            // LASTIDS = 0;
            ROOMS[data.roomId].map((userId)=>{
                CLIENTS[userId].client.emit('endGameSignal');
            });
        }
    });

    client.on('playAgain', (data) => {
        resetRoom(data);
        ROOMS[data.roomId].map((userId)=>{
            CLIENTS[userId].client.emit('playAgainSuccess', getRoomInfo(data.roomId));
        });
    });

    client.on('checkRoom', (data) => {
        if(typeof ROOMS[data.roomId] === 'undefined') {
            client.emit('checkRoomFail');
        }
    });

    client.on('disconnect', function() {

    });
});

http.listen(process.env.PORT || 5300, function() {
    console.log('SOCKET ready !');

});