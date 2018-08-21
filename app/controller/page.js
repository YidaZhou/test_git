var arr =[];

module.exports = {
    arr,
    add_data: async(ctx, next) => {
        await ctx.render('page/page')
    },
    save_data: async(ctx, next)=>{
        let query = ctx.request.body;
        arr.push(query);
        console.log(arr);
    },
    wrong: async(ctx, next) => {
        ctx.response.body = '<h1>404 Not Found</h1>'
    },
    delete_data: async(ctx, next)=>{
        let id = ctx.request.body.id;
        let id_prop = 0;
        console.log("id:"+id);
        for(let obj in arr){
            if(arr[obj].id==id){
                arr.splice(obj,1);
            }
        }
        for(let obj of arr){
            obj.id = '' + ++id_prop; 
        }
        console.log(arr);
    }
}