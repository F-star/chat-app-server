
# Chat App Server

即时聊天 APP 的服务端。

### 关于 secret 目录

secret 目录放置了一些敏感的配置项，不能放到版本管理里。请自行创建 secret 目录，并添加下述文件。

#### 目录结构

```
├── secret
│   ├── dbConfig.js
│   └── jwtSecret.js
```

#### dbConfig.js 文件

```js
const dbConfig = {
  host: '127.0.0.1',
  database: '数据库名',
  username: '用户名',
  password: '密码',
  timezone: '+08:00',
  dialect: 'mysql',
}

export default dbConfig
```

#### jwtSecret.js

```js
const jwtSecret = 'jwts 的密钥'

export default jwtSecret
```

### 项目结构搭建参考

- https://juejin.cn/post/6844903855772303367
- https://github.com/bayi-lzp/koa-template
