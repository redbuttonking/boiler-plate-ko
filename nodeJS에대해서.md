### mongoDB 연결

mongoose 패키지를 사용함

`npm install mongoose --save `

이후 js에서 연결하기

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://gustnqkr0414:abcd1234@cluster0.hkhtemw.mongodb.net/');
```

최신 MongoDB는 option을 안넣어주어도 됨

```js
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true, // 기본값으로 설정되어있음
  useUnifiedTopology: true, // 기본값으로 설정되어있음
  useCreateIndex: false, // 이 옵션을 더이상 지원 안함
  useFindAndModify: false, // 이 옵션을 더이상 지원 안함
});
```

### Model만들기 with \_ Schema

먼저 modles라는 폴더를 만들어서 모델의 이름.js 파일을 만들어 준다.

이후 Schema(스키마) 만들어주기

```js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1, // 이메일 중복 허용 안함
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // 관리자 유저를 위해
    type: Number,
    default: 0, // 지정해 주지 않으면 0 (즉 관리자가 아닌 유저)
  },
  image: String,
  token: {
    // 유효성 관리를 위해
    type: String,
  },
  tokenExp: {
    // 토큰을 사용할수 있는 유효기간
    type: Number,
  },
});
```

마지막으로 Schema를 model로 감싸줌

```js
const User = mongoose.model('User', userSchema);

module.exports = { User }; // 다른곳에서도 사용할수 있게 exports 해주기
```
