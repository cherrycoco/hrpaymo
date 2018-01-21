import React from 'react';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  form: {
  },
  input: {
    background: '#fff',
    flex: 'auto',
  },
  button: {
    label: {
      color: '#fff',
      position: 'relative'
    },
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 30,
  }
}

class Payment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      payeeUsername: '',
      amount: '',
      note: '',
      paymentFail: false,
      usernames: [],
      emojis: [],
      comment: '',
      open: false
    }
  }

  componentDidMount() {
    axios('/usernames', { params: { userId: this.props.payerId }})
    .then(response => {
      this.setState({
        usernames: response.data.usernames
      });
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  handleInputChanges (event) {
    // event.preventDefault();
    let target = event.target;
    this.setState({
      [target.name] : target.value,
      anchorEl: event.currentTarget
    })
        // event.preventDefault();
    this.getEmojiOnNoteChange(target.value);
  }

  getEmojiOnNoteChange (input) {
    var commentArray = input.split(' ');
    var mostRecentWord = commentArray[commentArray.length - 1]
    if (mostRecentWord.length > 2) {
      axios.get('/emoji', {params: {note: mostRecentWord}})
        .then( ({data}) => {
          var arrayOfEmojis = data.rows.map( (reactionObj) => {
            return reactionObj.r_emoji;
          })
          this.setState({
            emojis: arrayOfEmojis,
          })
        })
        .catch(err => console.log(err))    
    }
  }

  onDropdownInput(searchText) {
    this.setState({
      payeeUsername: searchText
    })
  }

  payUser() {
    let payment = {
      payerId: this.props.payerId,
      payeeUsername: !this.state.payeeUsername ? this.props.payeeUsername : this.state.payeeUsername,
      amount: this.state.amount,
      note: this.state.comment,
    };
    axios.post('/pay', payment)
      .then((response) => {
        this.setState({
          payeeUsername: '',
          amount: '',
          note: '',
          comment: '',
          paymentFail: false,
          emojis: []
        });
        this.props.refreshUserData(this.props.payerId);
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('UNAUTHORIZED:', error.response);
              break;
            case 422:
              console.error('UNPROCESSABLE ENTRY:', error.response);
              break;
            case 400:
              console.error('BAD REQUEST:', error.response);
              break;
          }
        } else {
          console.error('Error in payment component:', error);
        }
        this.setState({
          paymentFail: true
        });
      })
  }

  inputEmojiIntoTextField (emoji) {
    var myEmoji = emoji.currentTarget.getAttribute('name')
    var oldText = this.state.comment.split(' ');
    oldText[oldText.length- 1] = myEmoji
    this.setState({
      comment: oldText.join(' '),
      emojis: []
    })
  }

  render() {
    return (
      <Paper className='payment-container' style={style.form}>
        <div className='payment-item-container'>         
            {!this.props.payeeUsername && 
              <div className="form-box payment-username">
                <AutoComplete
                  hintText="Enter a username"
                  floatingLabelText="To:"
                  style={style.input}
                  name='payeeUsername'
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.usernames ? this.state.usernames : []}
                  maxSearchResults={7}
                  searchText={this.state.payeeUsername}
                  onUpdateInput = {this.onDropdownInput.bind(this)}
                />
              </div>
            }
          <br />
          <div className="form-box payment-amount">
            <TextField
              style={style.input}
              name='amount'
              value={this.state.amount}
              onChange = {this.handleInputChanges.bind(this)}
              hintText="Enter an amount"
              floatingLabelText="$"
            />
          <br />
          </div>
          <div className="form-box payment-note">
            <TextField
              style={style.input}
              name="comment"
              value={this.state.comment}
              hintText="What's it for?"
              floatingLabelText="Leave a comment"
              onChange={this.handleInputChanges.bind(this)}
            /><br />
              <Menu disableAutoFocus={true} onItemClick={this.inputEmojiIntoTextField.bind(this)}>
              {this.state.emojis.map ((emoji) => <MenuItem primaryText={emoji} name={emoji} value={emoji}/>)}
              </Menu> 
          <br />
          </div>
        </div>

        <button className='btn' onClick={this.payUser.bind(this)}>Pay</button>
        {this.state.paymentFail
          ? <label className='error-text'>
              Error in payment processing
            </label>
          : null
        }
      </Paper>
    );
  }
}

export default Payment;