$(function () {
    // Variable to store the room id for request
    var roomId;

    // Request for getting all the rooms
    $.ajax({
        type: "GET",
        url: "/api/rooms"
    }).done(function (rooms) {
        roomId = rooms[0].id;
        getMessages();
        $.each(rooms, function (key, room) {
            var a = '<a href="#" data-room-id="' + room.id + '" class="room list-group-item">' + room.name + '</a>';
            $("#rooms").append(a);
        });

    });

    // Request for adding new Room's message
    $("#post").click(function () {
        var message = {text: $("#message").val()};

        $.ajax({
            type: "POST",
            url: "/api/rooms/" + roomId + "/messages",
            data: JSON.stringify(message),
            contentType : "application/json"
        }).done(function () {
            $("#message").val("");
            getMessages();
        });
    });

    // Request for fetching a room's messages while selected
    $('body').on('click', 'a.room', function (event) {
        roomId = $(event.target).attr("data-room-id");
        getMessages();
    });

    // Request for fetching a room's messages with id= roomId
    function getMessages() {
        $.ajax({
            type: "GET",
            url: "/api/rooms/" + roomId + "/messages",
        }).done(function (data) {
            $("#roomName").text("Messages for " + data.room.name);
            var messages = "";
            $.each(data.messages, function (key, message) {
                messages += message.text + "\r";
            });
            $("#messages").val(messages);
        });
    }

    // Request for deleting a room's messages
    $("#delete").click(function(){
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/" + roomId + "/messages",
        }).done(function () {
            $("#messages").val("");
        });
    });


});