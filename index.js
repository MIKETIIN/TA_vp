const express = require('express');
const fs = require('fs').promises;
//moodul URL-i lahtiharutamiseks, et saaks POST osad ka kätte
const bodyparser = require('body-parser');
//moodul andmebaasiga suhtlemiseks, promises osaga async programmeerimise jaoks
const mysql = require('mysql2/promise');
//moodul .env faili lugemiseks, keskkonnamuutujate parsimiseks
require('dotenv').config();
const dateET = require('./src/dateET');

const textRef = 'public/txt/vanasonad.txt';
const regTextRef = 'public/txt/visits.txt';

//käivitan express.js funktsiooni ja annan nimeks "app"
const app = express();
//määrame veeilehtedele mallide renderdamise mootori
app.set('view engine', 'ejs');
//määran ühe päis kataloogi virtuaalses serveris kättesaadavaks
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));

//marsruudid
app.get('/', (req, res)=>{
    //res.send('Express.js läks käima ja serveerib meile veebi.');
    const dayNow = dateET.weekDay();
    const dateNow = dateET.fullDate();
    const timeNow = dateET.fullTime();
    res.render('index', {dayNow: dayNow, dateNow: dateNow, timeNow: timeNow});
});

app.get('/vanasona', async (req, res)=>{
    try {
        const data = await fs.readFile(textRef, "utf8");
        let folkWisdom = data.split(";");
        res.render('vanasona', {wisdom: folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))]});
    }
    catch (err) {
        console.log(err);
        res.render('vanasona',{wisdom: 'Ei leidnud ühtegi vanasõna!'});
    }
})

app.get('/regvisit', (req, res)=>{
    res.render('regvisit');
})

app.post('/regvisit', async (req, res)=>{
    try{
        await fs.open(regTextRef, 'a');
        await fs.appendFile(regTextRef, req.body.nameInput + ';');
            res.render('regvisit');
    }
    catch(err){
        
    }

})

app.get('/eestifilm', (req, res)=>{
    res.render('eestifilm');
});

app.get('/eestifilm/inimesed', async (req, res)=>{
    console.log('Andmebaasiserver on: ' + process.env.DB_HOST);
    let conn;
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        const sqlReq = 'SELECT * FROM person ORDER by last_name';
        const [sqlRes] = await conn.execute(sqlReq);
        console.log(sqlRes);
        res.render('eestifilminimesed', {personList: sqlRes});
    }
    catch(err){
        console.log('Viga andmebaasist lugemisel: ' + err);
        res.render('eestifilminimesed', {personList: []});
    }
    finally {
        if(conn) {
            await conn.end();
        }
    }
});

app.get('/eestifilm/inimesed_add', (req, res)=>{
    res.render('eestifilminimesed_add');
})

app.listen(5135);