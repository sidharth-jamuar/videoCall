const { eventNames } = require("../constants/eventNames");

class roomEvents {
    userJoinedRoomEvent = (socketOptions) => {
        const { socket, io,rooms } = socketOptions;
    
        //A client joins a room.
        socket.on(eventNames.roomEvents.joinRoomEvent , (data) => {
            console.log('Join room event')
            const { roomName, userName } = data;
            socket.join(roomName);
            socket.room = roomName;

            if(!rooms[roomName]) {
                rooms[roomName] = [];
            }
            //Before updating the room object, broadcast to all the current participants that a new user is joining.
            rooms[roomName].forEach(existingUser => {
                socket.to(existingUser.socketConnectionId).emit(eventNames.roomEvents.userJoinedRoomEvent, {
                    currentClientUserName: existingUser.userName,
                    newlyJoinedClientUserName: userName,
                    roomName,
                    currentClientSocketId: existingUser.socketConnectionId,
                    newUserSocketId: socket.id,
                })
            })
            //Update the room object with the newly joined user.
            this.#updateRoomObject(data, rooms, socket.id);
        })
    }

    #updateRoomObject = (data, rooms, socketConnectionId) => {
        const { roomName, userName} = data;
        rooms[roomName].push({
            socketConnectionId,
            userName,
            streamId: socketConnectionId,
        })
    }
}
const roomEventsInstance = new roomEvents();
module.exports = roomEventsInstance;