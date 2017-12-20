var express = require('express')
var bodyParser = require('body-parser')
const Client = require('@line/bot-sdk').Client;
var app = express()

const client = new Client({
  channelAccessToken: 'vK2JgN/WLIb3Q/ZcIL2/2YDXCSi74w8XIz+Tmd7JJu5KXOtVTBjOxo8d/LHlHFA7EhuDeXgJOUoE6rEUNZCWlX09Z7IXBIFECNvw5KPVo5/gUYKq6vkaPp387RT2wm5G0AWIc7AAlta5B5pe6gJSqAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f787f2e45e6e2dcaaa8068d5d905181f'
});

// client.pushMessage(userId, { type: 'text', text: 'hello, world' })
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  
    // console.log('req: ', req)
    // console.log('body: ', req.body)
  
    const event = req.body.events[0];
  
    if (event.type === 'message') {
      const message = event.message;

      if (message.type === 'text' && message.text.indexOf('hello') > -1) {
        client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'สวัสดีสุดหล่อ อิอิ คิคิ',
        })
        .then(() => {
          res.sendStatus(200)
        })
        .catch((e) => {
          console.log('error: ', e)
          res.sendStatus(400)
        })
      }
    } else {
      res.send('No user')
    }
  })
  

app.get('/', function (req, res) {
	res.send('Hello')
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})