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

router.route('/add')
    /*
        Request add new chat room form
     */
    .get( function (req, res) {
        res.render('rooms/add', { title : 'Add  a room' });
    })

    /*
        Submit create new chat room form
     */
    .post(function (req, res) {
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

router.route('/edit/:id')
    .all(function (req, res, next) {
        const room_id = req.params.id;
        const room = _.find(rooms, (room) => {
            return room.id === room_id;
        });
        if(!room){
            res.status(404);
            res.render('utils/404', {title: '404 Error', error_title: 'Error occurred while editing', error_code: 'OVA15-UR', error_reason: 'Chat room with ID = ' + room_id + ' not found !'})
            // next("Something wrong happen");
            return;
        }
        res.locals.room = room;
        next();
    })
    /*
        Edit chat room form
     */
    .get( function (req, res) {
        res.render('rooms/edit');
    })
    /*
        Submit Edit chat room
     */
    .post(function (req, res) {
        res.locals.room.name = req.body.name;
        res.redirect('./..');
    });

module.exports = router;