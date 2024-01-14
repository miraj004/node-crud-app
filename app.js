require("dotenv").config();
const express = require("express");
const  flash  = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const expressLayouts = require("express-ejs-layouts");


const connectDb = require('./server/config/database');

const app = express();

const port = 5000 || process.env.PORT;
connectDb();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))

app.use(express.static("public"));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
}));

app.use(flash());



app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set('view engine', 'ejs');


// Admin Post Route
app.use('/', require('./server/routes/postRoute'));
app.use('/admin', require('./server/routes/adminPostRoute'));

app.get('*', (req, res) => {
    res.status(404).render('errors/404', {title: 'Not Found', style: '404'});

});

app.listen(port, () => {
    console.log(`connecting... on port ${port}`);
});

