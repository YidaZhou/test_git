var arr =[];

var fs = require("fs");
var file = "page.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var table_name="student"

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS  "+table_name+"  (" +
        "ID TEXT," +
        "sid  TEXT," +   
        "name  TEXT    ," +         
        "grade  TEXT " +             
        ") "
    );
});

function get_from_database() {
    db.serialize(function() {
        db.all("SELECT * FROM "+table_name, function(err, rows) {
            for(let row of rows) {
                let data = {
                    id: row.ID,
                    studentId: row.sid,
                    name: row.name,
                    grade: row.grade
                }
                arr.push(data);
            }
            console.log(arr);
        });
    });
}

get_from_database();

module.exports = {
    db,
    arr,
    add_data: async(ctx, next) => {
        await ctx.render('page/page')
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
            var  del=db.prepare("DELETE from "+table_name+" where ID=?")
            del.run(id)
            del.finalize();
        });
        console.log(arr);
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
        let temp = arr;
        ctx.body = JSON.stringify(temp);  
        // setTimeout(() => {
        // }, 1000);
    }
}