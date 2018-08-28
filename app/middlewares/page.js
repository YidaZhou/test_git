module.exports = {
    make_database_if_not_exist: (db, table_name)=>{
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS  "+table_name+"  (" +
                "ID TEXT," +
                "sid  TEXT," +   
                "name  TEXT    ," +         
                "grade  TEXT " +             
                ") "
            );
        });
    },
    get_from_database: (db, table, arr)=>{
        db.serialize(function() {
            db.all("SELECT * FROM "+table, function(err, rows) {
                for(let row of rows) {
                    let data = {
                        id: row.ID,
                        studentId: row.sid,
                        name: row.name,
                        grade: row.grade
                    }
                    arr.push(data);
                }
            });
        });
    },
    send: (data, ctx)=>{
        let temp = data;
        ctx.body = JSON.stringify(temp);
    }
}