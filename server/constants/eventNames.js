const eventNames = {
    connection: 'connection',
    roomEvents: {
        joinRoomEvent: 'joinRoomEvent',
        userJoinedRoomEvent: 'userJoinedRoomEvent',
    },
    webrtcEvents: {
        offerToNewUser: 'offerToNewUser',
        newUserGetsOffer: 'newUserGetsOffer',
        newUserSendsAnswer: 'newUserSendsAnswer',
        offerSenderReceivesAnswer: 'offerSenderReceivesAnswer',
    }
}

module.exports = {eventNames}