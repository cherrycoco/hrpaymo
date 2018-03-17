import React, { Component } from 'react';
import axios from 'axios';
import FriendList from './ChatFriendList.jsx';
import {ChatMessages, ChatBox} from './ChatMessages.jsx';
import Navbar from './Navbar.jsx';
// import openSocket from 'socket.io-client';
// let socket;

const fakeData = [
  {
    friend: {
      username: 'cody', 
      imageUrl: 'image'
    },
    messages: [
      {
        sender: 'cody',
        reciever: 'newguy',
        message: 'Hello newguy'
      },
      {
        sender: 'newguy',
        reciever: 'cody',
        message: 'Hello cody'
      }
    ]
  },
  {
    friend: {
      username: 'cherry', 
      imageUrl: 'image'
    },
    messages: [
      {
        sender: 'cherry',
        reciever: 'blam92',
        message: 'Hello blam92 I am cherry'
      },
      {
        sender: 'blam92',
        reciever: 'cherry',
        message: 'oh hi!'
      }
    ]
  },
  {
    friend: {
      username: 'jarrod', 
      imageUrl: 'image'
    },
    messages: [
      {
        sender: 'blam92',
        reciever: 'jarrod',
        message: 'Hello jarrod! u there?'
      },
      {
        sender: 'jarrod',
        reciever: 'blam92',
        message: 'Hello jarrod! u there?'
      }
    ]
  }
] 

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr',
    gridTemplateAreas: "'friendList chat'",
  },

  friendList: {
    gridArea: 'friendList'
  },
  chat: {
    display: 'grid',
    gridArea: 'chat',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 100px',
    gridTemplateAreas: "'messageBox' 'chatBox'"
  },
  messageBox: {
    gridArea: 'messageBox'
  },
  chatBox: {
    gridArea: 'chatBox'
  }
};

let emptyChatData = {
  friend: {
    username: '', 
    imageUrl: '',
    id: null
  },
  messages: []
}

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      onlineUsers: [],
      currentChatData: emptyChatData,
      notifications: {}
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.openChatWithFriend = this.openChatWithFriend.bind(this);
    this.logOutAndDisconnect = this.logOutAndDisconnect.bind(this);
  }
  componentDidMount() {
    // socket = openSocket('/');
    this.setState({
      currentChatData: emptyChatData
    });

    this.getUsers();
    this.props.socket.on('chat', (chatData) => {
      console.log('CHAT DATA SENT!', chatData);
      this.updateChats(chatData.message, chatData.friendId, chatData.friendUsername, chatData.date);
    });
    this.props.socket.on('user disconnect', (onlineUsers) => {
      this.setState({
        onlineUsers: onlineUsers
      })

      console.log('USER DISCONNECT, ACTIVE: ', onlineUsers);
    });
    this.props.socket.on('user connect', (onlineUsers) => {
      this.setState({
        onlineUsers: onlineUsers
      });
      console.log('USER CONNECT, ACTIVE: ', onlineUsers);
    });
    this.props.socket.emit('user connect', this.props.userInfo);
  }

  getUsers() {
    axios('/usernames', { params: { userId: this.props.userInfo.userId }})
    .then(response => {
      this.setState({
        users: response.data.usernames
      });
    })
    .catch(err => {
      console.error(err);
    })
  }

  sendMessage(message) {
    let messageDate = new Date().toISOString();
    this.props.socket.emit('chat', {
      newMessage: message,
      receiverInfo: this.state.currentChatData.friend,
      senderId: this.props.userInfo.userId,
      senderUsername: this.props.userInfo.username,
      date: messageDate
    });
    // this.updateChats(message, this.state.currentChatData.friend.id);
    console.log('MESSAGE FOR UPDATE', message, messageDate);
    this.updateCurrentChats(this.props.userInfo.userId, this.state.currentChatData.friend.id, message, messageDate);

    this.postMessage(this.props.userInfo.username, this.state.currentChatData.friend.username, message)
    .then((res) => {
      console.log('message has been posted', res);
    }).catch((err) => {
      console.log('error posting message', err);
    })

  }

  updateCurrentChats(sender, receiver, message, date) {
    let updatedData = Object.assign({}, this.state.currentChatData);
    updatedData.messages.push({
      sender_id: sender,
      receiver_id: receiver,
      chat: message,
      date: date
    });

    this.setState({
      currentChatData: updatedData
    });
  }


  updateChats(message, friendId, friendUsername, date) {
    //check if the user who sent the message is currently being displayed.
    if(this.state.currentChatData.friend.id === friendId) {
      this.updateCurrentChats(this.state.currentChatData.friend.id, this.props.userInfo.userId, message, date);
    } else {
      let notifications = Object.assign({}, this.state.notifications);
      console.log('STATUS OF NOTIFICATIONS', notifications[friendUsername]);
      notifications[friendUsername] = notifications[friendUsername] + 1 || 1;
      console.log('UPDATED NOTIFICATIONS', notifications[friendUsername]);
      this.setState({
        notifications: notifications
      });
    }
  }

  openChatWithFriend(friendUsername) {
    let notifications = Object.assign({}, this.state.notifications);
    delete notifications[friendUsername]

    this.getChatHistory(friendUsername, (data) => {
      data.messages.sort((a,b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      this.setState({
        currentChatData: data,
        notifications: notifications
      })
    });
  }

  getChatHistory(friendName, cb) {
    axios('/messages', { params: { currentUser: this.props.userInfo.username, friend: friendName }})
    .then(response => {
      cb(response.data);
    })
    .catch(err => {
      console.error(err);
    })
  }

  postMessage(sender, receiver, message) {
    return axios.post('/messages', {
      sender: sender,
      receiver: receiver,
      chat: message
    });
  }

  logOutAndDisconnect() {
    this.setState({
      currentChatData: 
        {
          friend: {
            username: '', 
            imageUrl: '',
            id: null
          },
          messages: []
        }
    });
    this.props.socket.close();
    this.props.logUserOut();
  }
  removeListeners() {
    this.props.socket.off('chat');
    this.props.socket.off('user connect');
    this.props.socket.off('user disconnect');
    console.log('removing listeners...');
  }

  componentWillUnmount() {
    this.removeListeners();
  }
  render() {
    return (
      <div>
        <Navbar 
        isLoggedIn={this.props.isLoggedIn} 
        logUserOut={this.logOutAndDisconnect}
        />
        <div style={styles.container}>
          <div style={styles.friendList} className="friend-list">
            <FriendList onlineUsers={this.state.onlineUsers} 
            users={this.state.users} notifications={this.state.notifications} openChat={this.openChatWithFriend}/>
          </div>
          <div style={styles.chat} className="chat">
            <div style={styles.messageBox} className="messagebox">
              <ChatMessages chats={this.state.currentChatData} 
              userAvatar={this.props.userInfo.avatarUrl} currentUserId={this.props.userInfo.userId}/>
            </div>
            <div style={styles.chatBox} className="chatbox">
              <ChatBox sendMessage={this.sendMessage}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;