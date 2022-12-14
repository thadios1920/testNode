const express = require('express')
const app = express()


app.set('view engine','ejs')
app.use(express.urlencoded({ extended : true }))
app.use(express.json())


const publicationRouter = require('./routes/publication')

app.use('/posts',publicationRouter)

app.listen(8080,()=>{
    console.log('listening sur 8080');
})