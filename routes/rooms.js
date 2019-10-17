var express = require('express');
var router = express.Router();
var node_uuid = require('node-uuid');
var _ = require('lodash');
let rooms = [
            // {name: 'C# development', id: 'as55-26-sa5-a455'},
            // {name: 'Web development with Bootstrap 3', id: 'd45a46-as5a-s5-7raae'}
        ];

router.get('/', function (req, res) {
    res.render('rooms/index',  { title : 'Rooms management', rooms: rooms});
});

/*
    Request add new chat room form
 */
router.get('/add', function (req, res, next) {
    res.render('rooms/add', { title : 'Add  a room' });
});

/*
    Submit create new chat room form
 */
router.post('/add', function (req, res, next) {
    const room = {
        name: req.body.name,
        id: node_uuid.v4()
    };
    rooms.push(room);
    // Respond with JSON
    // res.json(room);
    res.redirect(req.baseUrl);
});

/*
    Deleting a chat room
 */
router.get('/delete/:id', function (req, res, next) {
    const room_id = req.params.id;
    rooms = rooms.filter((room) => {
        return room.id !== room_id;
    });
    // Redirect to list of chat rooms
    res.redirect(req.baseUrl);
});

/*
    Edit chat room form
 */
router.get('/edit/:id', function (req, res) {
    const room_id = req.params.id;
    const roomIndex = _.findIndex(rooms, (room) => {
        return room.id === room_id;
    });
    if(roomIndex > -1){
       const room = rooms[roomIndex];
        res.render('rooms/edit', {room});
    }
    else{
        res.render('utils/404', {title: '404 Error', error_title: 'Error occurred while editing', error_code: 'OVA15-UR', error_reason: 'Chat room with ID = ' + room_id + ' not found !'})
    }
});

/*
    Submit Edit chat room
 */
router.post('/edit/:id', function (req, res) {
    const roomId = req.params.id;
    const roomName = req.body.name;
    const roomIndex = _.findIndex(rooms, (room) => {
        return room.id === roomId;
    });
    if(roomIndex > -1){
        rooms[roomIndex].name = roomName;
        res.redirect(req.baseUrl);
    }
    else{
        res.render('utils/404', {title: '404 Error', error_title: 'Error occurred while editing !', error_code: 'OVA15-UR', error_reason: 'Chat room with ID = ' + roomId + ' not found !'})
    }
});

module.exports = router;