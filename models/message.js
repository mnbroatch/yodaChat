const mongoose = require('mongoose');
const request = require('request');
const watson = require('watson-developer-cloud');
const fs = require('fs');

const textToSpeech = watson.text_to_speech({
  username: "c3fa4ff8-b7ff-4c70-aae0-50017dc58216",
  password: "lCioWmy44BQi",
  // url: "https://stream.watsonplatform.net/text-to-speech/api",
  version: "v1",
});

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
    if (err) return err;
    this.body = body;
    this.toSpeech(this.body);
    next();
  });
});

messageSchema.methods.toSpeech = function () {
console.log('this.body',this.body);
  const params = {
    text:this.body,
    voice: "en-US_MichaelVoice",
    accept: "audio/wav",
  };
  textToSpeech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
};


const message = mongoose.model('Message', messageSchema);

module.exports = message;
