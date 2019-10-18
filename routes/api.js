var express = require('express');
var router = express.Router();
let rooms = require('../data/rooms');
let messages = require('../data/messages');

var _ = require("lodash");
var uuid = require("node-uuid");
/*
    Get all chats room
 */
router.get('/rooms', function (req, res, next) {
    res.json(rooms);
});
router.route("/rooms/:roomId/messages")
    .get(function (req, res) {
        let roomId = req.params.roomId;
        let roomMessages = messages
            .filter(m => m.roomId === roomId);

        let room = _.find(rooms, r => r.id === roomId);
        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room: room,
            messages: roomMessages
        })

    })
    .post(function (req, res) {
        const roomId = req.params.roomId;

        const message = {
            roomId: roomId,
            text: req.body.text,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id: uuid.v4()
        };

        messages.push(message);

        res.sendStatus(200);
    })
    .delete(function (req, res) {
        const roomId = req.params.roomId;

        // note: careful as this will not update the array that was exported from the messages.json module so if you use that array in other modules it won't update.
        messages = messages.filter(m => m.roomId !== roomId);

        res.sendStatus(200);
    });

module.exports = router;