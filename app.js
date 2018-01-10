const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
mongoose.connect(config.mongohost, { useMongoClient: true });
mongoose.Promise = global.Promise;
const app = express();

const users = require('./routes/users');

//const port = 3000;
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

app.get('/',(req,res)=>{
    res.send("the port: "+port);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () => {
    console.log("server serve at "+port);
});
