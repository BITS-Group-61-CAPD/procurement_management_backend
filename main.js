const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(bodyparser.json())

const route=require('./route')

app.use('/',route)


app.listen(5000,console.log("Listening at  5000"))






