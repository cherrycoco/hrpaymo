const pg = require('./index.js').pg;

module.exports = {

  getAllUserTransactions: (userId, callback) => {

    pg.table('users_transactions')
        .join('users', 'users_transactions.payee_id', '=', 'users.id')
        .where('users_transactions.payer_id', '=', userId)
        .select('users.username')

    .then( (result) => {
      callback(null, result);
    })
    .catch( (err) => {
      callback(err, null);
    })
  },

  getAllUserAmountsSpent: (username, callback) => {
    var subquery = pg.table('users').where('users.username', '=' ,`${username}`).select('users.id');
    pg.table('transactions')
      .join('users_transactions', 'transactions.txn_id', '=', 'users_transactions.txn_id')
      .where('users_transactions.payer_id', 'in', subquery)
      .select('transactions.amount')

    .then( (result) => {

    var secondSubquery = pg.table('users').where('users.username', '=' ,`${username}`).select('users.id');
    pg.table('transactions')
      .join('users_transactions', 'transactions.txn_id', '=', 'users_transactions.txn_id')
      .where('users_transactions.payee_id', 'in', secondSubquery)
      .select('transactions.amount')  

      .then( (secondResult) => {
        callback(null, result, secondResult);
      })    
      .catch( (err) => {
        callback(err, null)
      })
    })
    
    .catch( (err) => {
      callback(err, null);
    })  
  },

  getAllUserNotes: (username, callback) => {

    var subquery = `select users.id from users where users.username = '${username}'`
    var query = `SELECT transactions.note from transactions inner join users_transactions on transactions.txn_id = users_transactions.txn_id WHERE users_transactions.payer_id = (${subquery});`
      pg.raw(query)
      .then( (result) => {
        console.log('notes:', result);
        callback(null, result)
      })
      .catch( (err) => {
        callback(err, null)
      })
  },

  getEmoji: (string, callback) => {
      var query = `select r_emoji from (select reactions.emoji as r_emoji, to_tsvector(reactions.description) as document from reactions) as r_search WHERE r_search.document @@ to_tsquery('${string}:*');`

      pg.raw(query)
        .then( (emojiList) => {
          console.log('emojis! ', emojiList.rows)
          callback(null, emojiList)
        })
        .catch( (err) => {
          callback(err, null);
        })
  }

};