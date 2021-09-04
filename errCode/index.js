
const ErrCode = {
  Unauth: {
    code: 10001,
    msg: '错误的用户凭证'
  },
  ArgsFormatWrong: {
    code: 10002,
    msg: '传参错误'
  },
  SameUserName: {
    code: 10003,
    msg: '已存在同名用户'
  }
}

export default ErrCode