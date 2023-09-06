const { eventNames } = require("../constants/eventNames");

class webrtcEvents {
    clientGivesOfferToNewConnectedUser = (socketOptions) => {
        const { socket, io, rooms } = socketOptions
        //New connected user gets offer from client.
        socket.on(eventNames.webrtcEvents.offerToNewUser, (data, clientOfferToNewUser) => {
            console.log('Client sends offer to new connected user');
            const { newUserSocketId, roomName, newlyJoinedClientUserName, currentClientUserName, currentClientSocketId } = data;
            const sendOfferToNewUser = rooms[roomName].find(client => newUserSocketId === client.socketConnectionId);
            socket.to(sendOfferToNewUser.socketConnectionId).emit(eventNames.webrtcEvents.newUserGetsOffer, 
                {offerReceiverClientUserName: newlyJoinedClientUserName,
                roomName, 
                offerReceiverClientSocketId:newUserSocketId,
                offerSenderUserName:currentClientUserName,
                offerSenderSocketId: currentClientSocketId
                },
                clientOfferToNewUser);
        });
    }
    newUserSendsAnswerToOfferingClient = (socketOptions) => {
        const { socket, io, rooms } = socketOptions;
        socket.on(eventNames.webrtcEvents.newUserSendsAnswer, (data, newUserAnswerToOfferingClient) => {
            console.log(data);
            const { roomName , offerSenderUserName, offerSenderSocketId, offerReceiverClientSocketId, offerReceiverClientUserName} = data;
            const answerReceiver = rooms[roomName].find(client => offerSenderSocketId === client.socketConnectionId);
            socket.to(answerReceiver.socketConnectionId).emit(eventNames.webrtcEvents.offerSenderReceivesAnswer,
                {
                    roomName,
                    answerReceiverSocketId: offerSenderSocketId,
                    answerReceiverUserName: offerSenderUserName,
                    answerSenderUserName: offerReceiverClientUserName,
                    answerSenderSocketId: offerReceiverClientSocketId,
                }, newUserAnswerToOfferingClient);
        })
    }
}

const webrtcEventsInstance = new webrtcEvents();
module.exports = webrtcEventsInstance;