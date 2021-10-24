const mysql=require('mysql2')



const pool =mysql.createPool({
    'host':'localhost',
    'database':'db_items',
    'user':'root',
    'password':'1234',
    insecureAuth : true
})



module.exports=pool.promise()