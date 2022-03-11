const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog',
{
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true
}).then(()=>{
    console.log('db connected')
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



app.get('/', async (req,res)=> {
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index', {articles:articles})
})

app.get('/about',async(req,res)=>{
    res.render('articles/about');
})

app.use('/articles',articleRouter)
app.listen(5000)