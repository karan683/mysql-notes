const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db');

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));


// by promises
app.get('/',async(req,res,next)=>{
    try {
        const [rows,fields] = await connection.query('SELECT COUNT(*) AS total FROM users');
        res.render('index',{count:rows[0].total})
    } catch (error) {
        console.log(error);
    }
});

app.post('/register',async(req,res,next)=>{
    try {
        const [rows,fields] = await connection.query('INSERT INTO users(email) VALUES (?)',[req.body.email]);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
})

// by callbacks
// app.get('/',(req,res,next)=>{
//     connection.query('SELECT COUNT(*) AS total FROM users',(err,results)=>{
//         if(err) throw err;
//         const count = results[0].total;
//         res.render('index',{count})
//     });
// });

// app.post('/register',(req,res,next) => {
//     connection.query('INSERT INTO users(email) VALUES (?)',[req.body.email],(error,results)=>{
//         console.log(error);
//         console.log(results);
//         res.redirect('/');
//     });
// });

app.listen(8000,(err)=>{
    if(err) console.log(err);
    console.log('server started');
});

