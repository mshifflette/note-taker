const express = require('express');
const path = require('path');
const notes = require('./db/db.json')
var uniqid = require('uniqid'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
); 

app.get('/api/notes', (req, res) =>
res.json(notes)); 

app.post('/api/notes', ((req, res)=>{
req.body.id = uniqid();
notes.push(req.body); 
}));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
); 

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);