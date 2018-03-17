import React, {Component} from 'react';
import Card from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Send from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';

const styles = {
  chatbox: {
    container: {
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr 60px',
      gridTemplateAreas: "'textField send'",
      margin: '2% 5%'
    },

    textField: {
      gridArea: 'textField'
    },
    send: {
      gridArea: 'send',
      margin: '25%',
      cursor: 'pointer'
    }
  },
  messagebox: {
    paper: {
      height: 100,
      width: 200,
      textAlign: 'center',
      margin: '20% 39%',
      display: 'inline-block',
      fontWeight: 'bold'
    }
  }
}

const Message = (props) => {
  return (
    <ListItem
    primaryText={props.message || 'Random message'}
    leftAvatar={<Avatar src={props.imageUrl || ''} />}
    />
  );
}

const ChatMessages = (props) => {
  const messages = props.chats.messages.map((val, index) => {
    let image = val.sender_id === props.currentUserId ? props.userAvatar : props.chats.friend.avatar_url;
    return <Message message={val.chat} imageUrl={image} key={index}/>
  });
  let renderedItem;
  if(messages.length > 0) {
    renderedItem = (<Card style={{width: '100%', height: '100%'}}>
      <ListItem
      disabled={true}
      primaryText={props.chats.friend.username}
      leftAvatar={<Avatar src={props.chats.friend.avatar_url} />}
      style={{fontWeight: 'bold'}}
      />
      <Divider/>
      {messages}
    </Card>)
  } else {
    renderedItem = (
      <Card style={{width: '100%', height: '100%'}}>
        <div style={styles.messagebox.paper}>Start chatting!</div>
      </Card>
    )
  }
  return renderedItem;
}

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.send = this.send.bind(this);
  }

  send(e) {
    if(e.key === 'Enter' || e.type === 'click') {
      this.props.sendMessage(this.state.message);
      this.setState({
        message: ''
      });
    }
  }

  render() {
    return (
      <Card style={{width: '100%', height: '90%'}}>
        <div style={styles.chatbox.container} onKeyPress={this.send}>
          <div style={styles.chatbox.textField}>
            <TextField
            hintText="Send message..."
            fullWidth={true} ref={(node) => this.node = node}
            value={this.state.message}
            onChange={(e) => this.setState({message: e.target.value})}
            />
          </div>
          <div style={styles.chatbox.send}>
            <Send onClick={this.send}/>
          </div>
        </div>
      </Card>
    );
  }
}

module.exports = {
  ChatMessages,
  ChatBox
}