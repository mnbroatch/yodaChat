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
  fileName: { type: String },
});

messageSchema.pre('save', function (next) {
  const options = {
    method: 'GET',
    url: `https://yoda.p.mashape.com/yoda?sentence=${this.body}`,
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY,
      Accept: 'text/plain',
    },
  };
  request(options, (err, response, body) => {
    if (err) return err;
    this.body = body;
    // this.toSpeech((filename) => {
    //   this.filename = filename;
    //   return next();
    // });
    return this.toSpeech(next)
  });
});

messageSchema.methods.toSpeech = function (cb) {
  let words = this.body.match(/[a-z.,]+/ig);
  if (words.indexOf('Hmmmmmm.') > 0) {
    const index = words.indexOf('Hmmmmmm.');
    words[index] = words[index].slice(0, 3);
  }
  words = words.join(' ');
  const params = {
    text: words,
    voice: 'en-US_MichaelVoice',
    accept: 'audio/wav',
  };
  console.log('before text to speech');
  const fileName = `audio/yodaSpeech-${this._id}.wav`;
  textToSpeech.synthesize(params)
    .pipe(fs.createWriteStream(fileName))
    .on('finish', () => {
      this.fileName = fileName;
      cb();
    });
};


const message = mongoose.model('Message', messageSchema);

module.exports = message;
