const router = require('koa-router')()
const PageController = require('./controller/page')

module.exports = (app) => {
    router.get('/', PageController.add_data )
    
    router.post('/add', PageController.save_data )

    router.post('/del', PageController.delete_data )
        
    // router.get('/:id/:name', async(ctx, next)=>{
    //     console.log(ctx.params)
    //     ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    // })
  
    // router.get('/user', async(ctx, next)=>{
    //     ctx.response.body = 
    //     `
    //     <script>
    //     xmlhttp=$.ajax({url:"/user/register",async:true, dataType:"xml", data:"<p>hello world.</p>", method:"POST"});
    //     </script>
    //     `
    // })

    // router.post('/',async(ctx, next)=>{
    //     let x = ctx.request.body;
    //     console.log(x);
    //     // if( name === 'ikcamp' && password === '123456' ){
    //     //     ctx.response.body = `Hello， ${name}！`
    //     // }else{
    //     //     ctx.response.body = `${name}, ${password}`;
    //     //     console.log(name, password);
    //     // }
    // })
    
    router.get('/404', PageController.wrong )
    
    app.use(router.routes())
    .use(router.allowedMethods())
}