const express = require('express');
const path = require("path");
const app = express();
const router = express.Router();
app.set('view engine', 'ejs')
app.use(express.json())

const Check = (req, res, next) => {
  let time = new Date();
  if (
    time.getDay() <= 4 &&
    time.getDay() >= 1 &&
    time.getHours() <= 17 &&
    time.getHours() >= 9
  ) {
    console.log("is open");
    next();
  }
  else res.render('closed')
};


router.get('/home', Check, (req, res) => {
  res.render('home')
 })
router.get('/services', Check,  (req, res) => {
  res.render('services')
})
router.get('/contact', Check, (req, res) => {
  res.render('contact')
}) 

app.use(express.static(__dirname + '/')); // pour lire le fichier css (the path)

app.use('/', router)

app.listen(5000, (err) => {
  err ? console.log(err) : console.log('server ok')
});
