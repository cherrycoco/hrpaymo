const db = require('../database/queries');
const moment = require('moment');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
let server_log_message = 'SMS NOTIFICATIONS ' + (process.env.ENABLE_SMS.toLowerCase() === 'true' ? 'ENABLED' : 'DISABLED');
console.log(server_log_message);

const formatDate = (dateTime) => {
  return moment(dateTime).format('L'); //need to support users in multiple timezones
  // return moment(dateTime).format('M/D/YY');
}

const formatTime = (dateTime) => {
  return moment(dateTime).format('LT'); //need to support users in multiple timezones
}

const youPaid = (user, amount, time) => {
  return `You paid ${user} $${amount} on ${formatDate(time)} at ${formatTime(time)}. For more info, log in to your Paymo account.`;
}

const youWerePaid = (user, amount, time) => {
  return `${user} just paid you $${amount}! For more info, log in to your Paymo account.`;
}

const youRequested = (user, amount, time) => {
  return `You requested ${amount} from ${user} at ${time}. For more info, log in to your Paymo account.`;
}

const youHaveARequest = (user, amount, time) => {
  return `${user} sent you a request for ${amount}. For more info, log in to your Paymo account.`;
}

const messages = {
  payer: youPaid,
  payee: youWerePaid,
  requester: youRequested,
  requestee: youHaveARequest
}

const sendSMS = (phoneNumber, message) => {
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
    body: message
  }).then((mss) => console.log(mss.sid))
    .catch(err => console.log('Error in twilio message send', err));
}

const notifyTransaction = (transactionId) => {
  if (process.env.ENABLE_SMS.toLowerCase() === 'false') {return} //don't send notifications if master switch is flipped
  db.getTransactionInfo(transactionId)
    .then(dbResults => { sendTransactionNotifications(dbResults)})
    .catch(error => console.log('Error: could not retrieve transaction info from database'))
}

const sendTransactionNotifications = (transactionDetails) => {
  if (transactionDetails.payer_verified) { //really should have a setting to turn this on or off
    let message = messages.payer(transactionDetails.payee_name, transactionDetails.amount, transactionDetails.created_at);
    // console.log('payer message', message)
    sendSMS(transactionDetails.payer_phone, message);
  }
  if (transactionDetails.payee_verified) { //really should have a setting to turn this on or off
    let message = messages.payee(transactionDetails.payer_name, transactionDetails.amount, transactionDetails.created_at);
    // console.log('payee message', message)
    sendSMS(transactionDetails.payee_phone, message);
  }
}

module.exports = {
  notifyTransaction: notifyTransaction
}
