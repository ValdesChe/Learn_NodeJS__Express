var express = require('express');
var router = express.Router();
let rooms = [
    {name: 'C# development', id: '56ce602f-522c-499e-b629-41a10fa799ff'},
    {name: 'Web development with Bootstrap 3', id: '56ca02f-5q22c-49a9e-b62a9-41a10fdf'}
];

/*
    Get all chats room
 */
router.get('/rooms', function (req, res, next) {
    res.json(rooms);
});

module.exports = router;