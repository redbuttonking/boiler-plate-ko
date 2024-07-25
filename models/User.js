const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // 관리자 유저를 위해
    type: Number,
    default: 0,
  },
  image: String, //오브젝트가 아니어도 가능
  token: {
    // 유효성 관리를 위해
    type: String,
  },
  tokenExp: {
    // 유효기간(토큰을 사용할수 있는)
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
