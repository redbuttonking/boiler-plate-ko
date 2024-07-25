const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');
const bodyParser = require('body-parser');
const { User } = require('./models/User');

//application/x-www-form-urlencoded      <= 이렇게 생긴 데이터를 분석해서 가져오게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json      <= 이렇게 생긴 데이터를 분석해서 가져오게 해줌
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

// 회원 가입을 위한 라우터
app.post('/register', async (req, res) => {
  //회원 가입에 필요한 것들을 클라이언트가 데이텁 베이스에 넣어줌
  const user = new User(req.body);

  try {
    const userInfo = await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}~!`));
