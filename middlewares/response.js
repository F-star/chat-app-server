

// ctx.result, ctx.msg ==> ctx.body
const responseHandler = async (ctx) => {
  if (ctx.result !== undefined) {
    ctx.body = {
      code: 200,
      msg: ctx.msg || '',
      data: ctx.result
    }
  }
}

export default responseHandler