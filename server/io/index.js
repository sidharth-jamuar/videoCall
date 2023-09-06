const { eventNames } = require("../constants/eventNames");
const roomEventsInstance = require("./rooms");
const webrtcEventsInstance = require("./webrtcEvents");

module.exports = (io, rooms) => {
    //When a socket connection with a client is established.
    io.on(eventNames.connection, (socket) => {
        console.log('socket connected');
        console.log(`connected socket id ${socket.id}`);
        console.log('-----------');
        roomEventsInstance.userJoinedRoomEvent({socket, io, rooms});
        webrtcEventsInstance.clientGivesOfferToNewConnectedUser({socket, io, rooms});
        webrtcEventsInstance.newUserSendsAnswerToOfferingClient({socket, io, rooms})
        socket.on('disconnect', () => {
            console.log('one disconnected')
        })
    });
}