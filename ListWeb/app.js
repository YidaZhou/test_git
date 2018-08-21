// const Koa = require('koa')
// const router = require('koa-router')()
// const app = new Koa()

// // 添加路由
// // router.get('/', async (ctx, next) => {
// //   ctx.response.body = `<h1>index page</h1>`
// //   await next();
// // })

// // router.get('/', async(ctx, next) => {
// //     await ctx.render('home',{
// //       btnName: 'GoGoGo'
// //     })})
// // router.all('/', async (ctx, next) => {
// //   console.log('match "all" method')
// //   await next();
// // });
// // 调用路由中间件

// app.use(router.routes())

// app.listen(3000, ()=>{
//   console.log('server is running at http://localhost:3000')
// })

const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const  serve = require("koa-static");
const nunjucks = require('koa-nunjucks-2')
const path = require('path')

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

app.use(bodyParser())

router.get( '/', async(ctx, next) => {
  await ctx.render("page")
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})