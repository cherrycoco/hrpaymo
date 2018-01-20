
io.on('connection', function (socket) {
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
});



let TestChat = (props) => {
  let socket = openSocket('/');
  let inputNode = null;

  let sendMessage = (niceMessage) => {
    socket.emit('new message', {
      user: props.username,
      message: niceMessage
    });
  }

  return (
    <div>Send Message!</div>
    <input type="text" ref={(node) => inputNode = node}/>
    <button onClick={() => sendMessage(this.inputNode.value)}>Send!</button>
  )
}

//REMINDER OF HOW DATA LOOKS LIKE 
// {
//   user: props.username,
//   message: niceMessage
// };
socket.on('new message', function (data) {

  // we tell the client to execute 'new message'
  socket.broadcast.emit('new message', {
    username: data.username,
    message: data.message
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


class Messages extends Component {
  componentDidMount() {
    socket.on('new message', function (data) {
      addChatMessage(data);
    });
  }

  addChatMessage(data) {
    //adding the new message to state to re render the page with new message.
    this.setState({
      messages: this.state.messages.concat([data]);
    })
  }

  render() {
    let listOfMessages = ///... React component mapping and all that stuff...///
    <div> {listOfMessages}</div>
  }
}

