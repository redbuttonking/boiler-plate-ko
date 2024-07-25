### 🔭 mongoDB 연결

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

### 🔭 Model만들기 with \_ Schema

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

### 🔭 Register 라우트 만들기

클라이언트에서 유저가 회원가입을 할 때 제공한 정보들을 데이터 베이스에 넣어줘야 함

> 그전에 먼저 bodyParser를 설치해준다

`npm i body-parser --save`

이후 코드를 추가함

```js
// 모듈 가져오기
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded
//위와 같은 데이터를 분석해서 가져오게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
// json형식 데이터를 분석해서 가져오게 해줌
app.use(bodyParser.json());
```

> post()를 사용함

```js
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
```

⭐⭐⭐ 최신 버전 몽고DB는 Model.prototype.save() 메서드가 더 이상 콜백을 허용하지 않기 때문에  
콜백 대신 프로미스(Promise) 또는 async/await 패턴을 사용해야 합니다. (라고 GPT가 설명해줌 ㅎㅅㅎ)

### 🔭 Node Mon 다운

> Node Mon?

소스를 변경했을때 감지해서 자동으로 서버를 재 시작해주는 tool

`npm i nodemon --save-dev`

- -dev는 로컬에서 할때만 즉 개발할때만 사용하겠다는 뜻

⭐스크립트도 만들어주어야 함 (package.json에)⭐

`"scripts":{"backend":"nodemon index.js}`

이제 서버를 열때는 `npm run backend`

### 🔭 비밀 설정 정보 관리

몽고DB와 연결하는 중에 값들을 그대로 배포하면 안됨 (정보 털림!)

`config`라는 폴더를 만들어서 배포전(개발할때)js와 배포후js를 만들어주고 상황에 맞게 값이 들어가게 key.js를 만들어준다

`dev.js` development 약자  
`prod.js` production 약자  
`key.js`

마지막으로 gitignore에 dev.js가 안 올라가게 넣어주기
