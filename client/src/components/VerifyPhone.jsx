import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

export default class VerifyPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        phone: ''
      },
      open: false,
      validNumber: false,
      reminderOpen: false,
      codeFormIsOpen: false,
      showVerified: false,
      showError: false
    }
  }

  componentDidMount() {
    this.getUserPhoneNumber(this.props.userInfo.userId);
  }

  getUserPhoneNumber(userId) { //this needs to have some sort of authentication
    const { formData } = this.state;
    fetch(`/sms/userphone/${userId}`)
      .then(res => res.json())
      .then(json => {
        formData.phone = json.phone;
        this.setState({ formData });
        setTimeout(() => { this.setState({ reminderOpen: !json.verified })}, 1000)
        this.testNumber();
      }).catch(err  => {
        console.warn(err);
      });
  }

  submitForVerification() { //this needs to have some sort of authentication
    return fetch(`/sms/verification/start?p=${this.state.formData.phone}&uid=${this.props.userInfo.userId}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) { //secret code was sent
          this.setState({
            open: false,
            codeFormIsOpen: true
          })
        }
        else{ //phone number was not recognized
          this.openError();
        }
      }).catch(err => { //error with request
        console.warn('error with request', err);
      });
  }

  submitVerificationCode(code) {
    return fetch(`/sms/verification/verify`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        token: code,
        p: this.state.formData.phone,
        uid: this.props.userInfo.userId
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            open: false,
            reminderOpen: false,
            codeFormIsOpen: false
          })
          setTimeout(() => { this.setState({ showVerified: true }) }, 1000)
        } else {
          this.openError();
          this.setState({
            codeFormIsOpen: true
          })
        }
      }).catch(err => {
        this.openError();
        this.setState({
          codeFormIsOpen: true
        })
        console.warn(err);
      });
  }

  testNumber() {
    if ((parseInt(this.state.formData.phone).toString() === this.state.formData.phone) && (this.state.formData.phone.toString().length === 10 || this.state.formData.phone.toString().length === 11) ) {
      this.setState({validNumber: true});
    }
    else {
      this.setState({ validNumber: false });
    }
  }

  handleInputChanges(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
    this.testNumber();
  }

  closeError() {
    console.log('here')
    this.setState({ showError: false });
  }

  openError() {
    this.setState({showError: true});
    setTimeout(this.closeError.bind(this), 1500);
  }

  notNow() {
    this.setState({ reminderOpen: false });
    this.handleClose();
  }

  enter(e) {
    if (e.key === 'Enter') {this.handleSubmit.bind(this)};
  }

  handleSubmit() {
    if (this.state.validNumber) { this.submitForVerification() }
  }

  handleInputChanges(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
    this.testNumber();
  }

  closeError() {
    this.setState({showError: false});
  }

  openError() {
    this.setState({showError: true});
    setTimeout(this.closeError.bind(this), 1500);
  }

  notNow() {
    this.setState({ reminderOpen: false });
    this.handleClose();
  }

  enter(e) {
    if (e.key === 'Enter') {this.handleSubmit.bind(this)};
  }

  handleSubmit() {
    if (this.state.validNumber) { this.submitForVerification() }
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  openCodeInput() {
    this.setState({ codeFormIsOpen: true })
  };

  closeCodeInput() {
    this.setState({ codeFormIsOpen: false })
  }

  // showReminder() {
  //   window.setTimeOut(()=> {
  //     this.setState({ reminderOpen: !this.props.userInfo.verified });
  //   }, 2000)
  // }
  
  render() {
    const { formData } = this.state;
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.validNumber}
        onClick={this.submitForVerification.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Not Now"
        primary={true}
        onClick={this.notNow.bind(this)}
      />
    ];
      // , //uncomment me to add a button that pops open the code input window
      // <FlatButton
      //   label="Test"
      //   primary={true}
      //   onClick={this.openCodeInput.bind(this)}
      // />
    // ];
    return (
      <div id='phone_verification'>
        <Snackbar
          open={this.state.reminderOpen}
          message='Please verify your phone number'
          action="verify"
          autoHideDuration={3000}
          onActionClick={this.handleOpen.bind(this)}
          onRequestClose={()=>{}}
        />
        <Snackbar
          open={this.state.showVerified}
          message="Thanks! You're all set!"
          autoHideDuration={5000}
          onRequestClose={() => { this.setState({ showVerified: false }) }}
        />
        <Dialog
          title="Enter your phone number"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <ValidatorForm
            ref="form"
            onSubmit={this.handleClose.bind(this)}
            onError={errors => console.warn(errors)}
          >
            <TextValidator
              floatingLabelText="Phone Number"
              onKeyUp={this.enter.bind(this)}
              onChange={this.handleInputChanges.bind(this)}
              name="phone"
              value={formData.phone}
              validators={['required', 'isNumber', 'minStringLength:10', 'maxStringLength:11']}
              errorMessages={['this field is required', 'not a valid phone number', 'example: 7895551234', 'must not excede 11 characters']}
            />
          </ValidatorForm>
        </Dialog>
        <EnterCodeForm 
          open={this.state.codeFormIsOpen} 
          formAction={this.submitVerificationCode.bind(this)}
          closer={this.closeCodeInput.bind(this)}
        />
        <Dialog 
          title="Hmm, that didn't quite work. Please try again!"
          open={this.state.showError}
          actions={
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.closeError.bind(this)}
              keyboardFocused={true}
            />}

        />
      </div>
    );
  }
}

class EnterCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      code: ''
    }
  }

  handleSubmit() {
    this.props.formAction(this.state.code);
    this.setState( { code: '' } );
    this.props.closer()
  }

  enter(e) {
    if (e.key === 'Enter') (this.handleSubmit());
  }

  handleChange(e) {
    this.setState( { code: e.target.value } );
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closer}
      />,
      <FlatButton
        label="Verify"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ]
    return (
      <Dialog
        title="Enter the code sent to your phone"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closer}
      >
        <TextField 
          hintText="ex. '0000'" 
          onChange={this.handleChange.bind(this)} 
          onKeyUp={this.enter.bind(this)}
          floatingLabelText="Verification Code"
          value={this.state.code}
        />
      </Dialog>
    );
  }
}