const pg = require('./index.js').pg;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// bcrypt.hash('1234', saltRounds, (err, hash) => {
//   if (err) {
//     console.log(err);
//   } else {
//     password = hash;
//   }
// });

// setTimeout(() => console.log(password), 200);

const newUserSignup = function(user, cb) {
  return new Promise ((resolve, reject) => {
    bcrypt.hash(user.password, saltRounds, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  }).then(result => {
    console.log('password', result);
    let userId;
    let balanceInserts = [];
  
    let userInfo = {
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      password: result,
      phone: user.phone,
      email: user.email,
      avatar_url: user.avatarUrl ? signupData.avatarUrl : null
    }
    console.log('userinfo', userInfo);
    return pg.insert(userInfo, 'id').into('users')
    .then(id => {
      userId = id[0];
      console.log('userId', userId);
      for(let i = 0; i < user.wallets.length; i++) {
        balanceInserts.push({
          user_id: userId,
          amount: 100,
          currency_type: user.wallets[i]
        });
      }
      console.log('bb', balanceInserts)
      pg.batchInsert('balance', balanceInserts, user.wallets.length);
      return userId;
    }).then((userId) => {
      console.log('userId hereee', userId);
      return userId;
    });
  }).catch (err => err);
}


module.exports = {
  newUserSignup: newUserSignup
}