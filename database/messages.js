const pg = require('./index.js').pg;
const profileHelpers = require('./profile');

let getTwoUsersByName = (firstUser, secondUser) => {
  return profileHelpers.getProfileDataByUsername(firstUser)
  .then((user) => {
    return user;
  })
  .then((userOne) => {
    return profileHelpers.getProfileDataByUsername(secondUser)
    .then((userTwo) => {
      return {
        userOne: userOne[0],
        userTwo: userTwo[0]
      }
    });
  });
}

let getAllMessagesBetweenTwoUsers = (firstUser, secondUser) => {
  return getTwoUsersByName(firstUser, secondUser).then((users) => {
    console.log('users!!', users.userTwo.id);
    return pg('messages').where({
      sender_id: users.userOne.id,
      receiver_id: users.userTwo.id
    })
    .then((messages) => {
      return pg('messages').where({
        sender_id: users.userTwo.id,
        receiver_id: users.userOne.id
      }).then((invertedMessages) => {
        return {
          friend: users.userTwo,
          messages: messages.concat(invertedMessages)
        }
      })
    });
  });
}


let storeMessage = (senderUsername, receiverUsername, text) => {
  return getTwoUsersByName(senderUsername, receiverUsername)
  .then((users) => {
    return pg('messages').insert({
      sender_id: users.userOne.id,
      receiver_id: users.userTwo.id,
      chat: text
    }).catch((err) => {
      return err;
    }).then((res) => {
      return 'message saved!';
    });
  });
}

module.exports = {
  storeMessage: storeMessage,
  getAllMessagesBetweenTwoUsers: getAllMessagesBetweenTwoUsers,
  getTwoUsersByName: getTwoUsersByName 
}