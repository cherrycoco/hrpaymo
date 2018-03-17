const Client = require('authy-client').Client;
const enums = require('authy-client').enums;
const authy = new Client({ key: process.env.ACCOUNT_SECURITY_API_KEY });
// const authy = new Client({ key: process.env.TEST_SECURITY_API_KEY }, { host: 'https://sandbox-api.authy.com'});

module.exports.requestPhoneVerification = (phone_number, country_code) => {
  console.log('here', phone_number, country_code)
  return authy.startPhoneVerification({ 
    phone: phone_number, 
    countryCode: country_code, 
    locale: 'en', 
    via: enums.verificationVia.SMS 
  }).then((response, error) => {
    if (error) {console.log('error', error); return error;}
    else {console.log('success', response); return response;}
  });
}

module.exports.verifyPhoneToken = (phone_number, country_code, token) => {
    return authy.verifyPhone({ 
      countryCode: country_code, 
      phone: phone_number, 
      token: token
    }).then((response, error) => {
      if (error) {
        console.log('verify error', error)
        return error;
      } else {
        console.log('verify success', response)
        return response;
      }
    })
}
