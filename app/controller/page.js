var arr =[];

const fs = require("fs");
const file = "page.db";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);
const middleware = require("../middlewares/page");
const table_name="student";

middleware.make_database_if_not_exist(db, table_name);
middleware.get_from_database(db, table_name, arr);

module.exports = {
    db,
    arr,
    process_edited_data: async(ctx, next) => {
        let res = ctx.request.body.array
        arr = res;
        db.serialize(function() {
            var del=db.prepare("DELETE from "+table_name)
            del.run()
            del.finalize();
            for(let elem of arr){
                var insert = db.prepare("INSERT OR REPLACE  INTO "+table_name+"(ID,sid,name,grade) VALUES (?,?,?,?)");
                insert.run(elem.id, elem.studentId, elem.name, elem.grade);
                insert.finalize();
            }
        });
        middleware.send({},ctx);        
    },
    make_page: async(ctx, next) => {
        await ctx.render('page/page');
    },
    make_edit_page: async(ctx, next) => {
        console.log("making page")
        await ctx.render('page/edit_page');
    },
    save_data: async(ctx, next)=>{
        let query = ctx.request.body;
        arr.push(query);
        console.log(arr);
        db.serialize(function() {
            var insert = db.prepare("INSERT OR REPLACE  INTO "+table_name+"(ID,sid,name,grade) VALUES (?,?,?,?)");
            insert.run(query.id, query.studentId, query.name, query.grade);
            insert.finalize();
        });
        middleware.send({},ctx);
    },
    wrong: async(ctx, next) => {
        ctx.response.body = '<h1>404 Not Found</h1>'
    },
    order_data: async(ctx, next)=> {
        let id_prop = 0;        
        db.serialize(function() {
            for(let obj of arr){
                obj.id = '' + ++id_prop; 
                var upd = db.prepare("UPDATE "+table_name+" set ID=? where sid =?");
                upd.run(id_prop, obj.studentId);
                upd.finalize();
            }
        });
        middleware.send({},ctx);
    },
    delete_data: async(ctx, next)=> {
        let id = ctx.request.body.id;
        let location = 0;
        console.log("elem at " + id + "-1 is deleting")        
        while(location<arr.length){
            if(arr[location].id==id){
                arr.splice(location,1);
                console.log("elem at " + location + " is deleted.")                
            }
            else {
                location++;
            }
        }
        db.serialize(function() {
            let del=db.prepare("DELETE from "+table_name+" where ID=?")
            del.run(id)
            del.finalize();
        });
        console.log(arr);
        middleware.send({},ctx);
    },
    renew_data: async(ctx, next)=> {
        // arr=[];
        // db.serialize(function() {
        //     db.all("SELECT * FROM "+table_name, function(err, rows) {
        //         for(let row of rows) {
        //             let data = {
        //                 id: row.ID,
        //                 studentId: row.sid,
        //                 name: row.name,
        //                 grade: row.grade
        //             }
        //             arr.push(data);
        //         }
        //     });
        // });
        middleware.send(arr,ctx);
        // setTimeout(() => {
        // }, 1000);
    }
}