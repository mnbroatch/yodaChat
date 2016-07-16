const mongoose = require('mongoose');
const request = require('request');

const messageSchema = new mongoose.Schema({
  author: { type: String },
  body: { type: String },
  createdAt: { type: Date, default: Date.now },
});


messageSchema.pre('save', function (next) {
  console.log(message);
  let options = {
    method: 'GET',
    url: `https://yoda.p.mashape.com/yoda?sentence=${this.body}`,
    headers: {
      'X-Mashape-Key': 'oOoPUqYbiimshgsPxWlmJD6ntZ5np1Bseu5jsn3YdLXlj2I9x5',
      Accept: 'text/plain',
    },
  }
  request(options, (err,response,body) => {
    this.body = body;
    console.log('this',this);
    next();
  });
});


const message = mongoose.model('Message', messageSchema);

module.exports = message;
