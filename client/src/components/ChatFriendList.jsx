import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Badge from 'material-ui/Badge';
import _ from 'underscore';

const FriendItem = (props) => {
  let connectionMessage = props.isUserOnline ? '(Online)' : '(Offline)';
  console.log(connectionMessage);
  let rightIcons = null;
  if(props.pendingMessages) {
    rightIcons = (
      <Badge
      badgeContent={props.pendingMessages}
      primary={true}
      badgeStyle={{backgroundColor: 'green', width: 20, height: 20}}
      style={{paddingBottom: 0, paddingTop: 15, top: -4, margin: 0, marginTop: 10, marginRight: 10}}
      >
        <CommunicationChatBubble color={props.pendingMessages ? 'green' : '#757575'} style={{marginBottom: 5, width: 20, height: 20}}/>
      </Badge>);
  } else {
    rightIcons = (<CommunicationChatBubble color={props.pendingMessages ? 'green' : '#757575'} style={{marginBottom: 5, width: 20, height: 20}}/>);
  }

  return (<ListItem
  primaryText={(props.username || 'Random User') + ' ' + connectionMessage}
  // leftAvatar={<Avatar src={props.imageUrl || ''} />}
  rightIcon={rightIcons}
  value={props.username}
  innerDivStyle={{padding: '23px 56px 16px 16px'}}
  onClick={() => props.openChat(props.username)}
  />);
};

const FriendList = (props) => {
  const friendItems = props.users.map((username, index) => {
    let pendingMessages = props.notifications[username];
    let isUserOnline = _.find(props.onlineUsers, (users) => {
      return users.userData.username === username;
    });
    return <FriendItem username={username} key={index} openChat={props.openChat}
    pendingMessages={pendingMessages} isUserOnline={isUserOnline ? true : false}/>
  });
  return (
  <Card>
    <List>
      <Subheader>Friend List</Subheader>
      <Divider/>
      {friendItems}
    </List>
  </Card>
  )
}

export default FriendList;