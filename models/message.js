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
      'X-Mashape-Key': process.env.MASHAPE_KEY,
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
