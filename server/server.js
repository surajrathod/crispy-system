
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const {Book}=require('./models/book');
const {Store}=require('./models/store');
//mongoose 
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/BookStore');


//express 
var app=express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public'))


app.post('/api/add/store',(req,res)=>{
    var storemodel=new Store({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone
    })

    storemodel.save((err,doc)=>{
        if(err) res.status(400).send()
        res.status(200).send();
        
    })
});

app.post('/api/add/book',(req,res)=>{
    var boolmodel=new Book({
        name:req.body.name,
        author:req.body.author,
        pages:req.body.pages,
        price:req.body.price,
        store:req.body.stores
    });
    boolmodel.save((err,doc)=>{
        if(err) res.status(400).send()
        res.status(200).send();
        
    })
})

app.get('/api/store',(req,res)=>{
    Store.find({},(err,doc)=>{
        res.send(doc);
    })
})

app.get('/api/book',(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):10;
    let order=req.query.ord?req.query.order:'des';
    Book.find({}).limit(limit).exec((err,doc)=>{
        res.send(doc);
    })
})
app.get('/api/book/:id',(req,res)=>{
    let bookid=req.params.id;
    Book.findById(bookid,(err,doc)=>{
        res.send(doc);
    })
})

app.patch('/api/update/book/:id',(req,res)=>{
    let bookid=req.params.id;
    Book.findByIdAndUpdate(bookid,{$set:req.body},(err,doc)=>{
        res.status(200).send();
    })
})

app.delete('api/delete/book/:id',(req,res)=>{
    let bookId=req.params.id;
    Book.findByIdAndRemove(bookId,(err,doc)=>{
        res.status(200).send();
    })
})
let port=process.env.port||8080;
app.listen(port,()=>{
    console.log(`${port}`);
})