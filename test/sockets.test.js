const server = require('../server/app');
let chai = require('chai');
var expect = chai.expect;
let openSocket = require('socket.io-client');
var port = 4444;
var socketFunctions = require('../server/sockets');


let onlineUsers = [];
let client;
describe('Chat service', function() {
  before(function() {
    server.listen(port);
  });
  
  beforeEach(function() {
    onlineUsers = [];
    client = openSocket('http://127.0.0.1:4444', {'forceNew': true});
  });

  after(function(done) {
    server.close(done);
  });
  
  it('Should store socketId of connected user', function(done) {
    client.on('user connect', (onlineUsers) => {
      console.log('USER CONNECT, ACTIVE: ', onlineUsers);
      expect(onlineUsers[0].socketId).to.exist
      done();
    });
    client.emit('user connect', {'hi': 'hi'});
  }); 

  it('Should remove user from onlineUsers array when they disconnect', function(done) {
    client.on('chat', (chat) => {
      console.log('disconnect', onlineUsers);
    });

    client.emit('chat', {
      newMessage: 'message',
      receiverInfo: 'friend',
      senderId: 'userId',
      senderUsername: 'username'
    });

    done();
  });
});

describe('Search for users in online user list', function() {
  let onlineUsers = [];
  it('Should return false if list is empty', function() {
    let user = {username: 'blam92', userId: 1};
    let found = socketFunctions.forTest.isUserInList(onlineUsers, user);
    expect(found).to.equal(false);
  });

  it('Should return true if user is found', function() {
    let user = {username: 'blam92', userId: 1};
    onlineUsers.push({
      userData: user,
      friend: {}
    });
    
    let found = socketFunctions.forTest.isUserInList(onlineUsers, {username: 'test', userId: 1});
    expect(found).to.equal(true);
  });
});
