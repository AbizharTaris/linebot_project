const line = require('@line/bot-sdk')
require('dotenv').config();
import express from 'express';
import commands from './commands';

async function handleEvent(event, reply) {
  let msg;
  let [_, cmd = '', value] = event.message.text.split('/');
  try {
    if (cmd in commands) {
      msg = await commands[cmd](event, value);
      console.log(msg)
    }
    else {
      msg = { type: 'text', text: 'Perintah Salah.' };
    }
  } catch (err) {
    console.log(err)
    throw new Error(err);
  }
  reply.replyMessage(event.replyToken, msg);
};

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET,
};

const client = new line.Client(config);
const app = express();

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map((event) => handleEvent(event, client)))
});

const port = 3002;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
