const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var path = require('path');

const app = express();

const uri = 'mongodb://127.0.0.1:27017/Lab5'

// sử dụng middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')   // khai báo template EJS
app.set('views', './views')      // khai báo views chứa các giao diện

mongoose.connect(uri)            // kết nối đến cơ sở dữ liệu MongoDB bằng đường dẫn kết nối uri.
  .then(() => console.log('Connected!'));

const Schema = mongoose.Schema;     // định nghĩa một Schema cho collection "User" trong MongoDB

const user = new Schema({     // Mỗi tài liệu trong collection này sẽ có hai thuộc tính là username và password có kiểu dữ liệu là String
  username: String,
  password: String,
}, {
  collection: 'User'
});

const UserModel = mongoose.model('user', user);     // Model này có thể được sử dụng để tương tác với collection "User" trong MongoD

// edit
app.post('/user/list/formcommit/:id', (req, res) => {
  const id = req.params.id
  const username = req.body.username
  const password = req.body.password

  console.log(`${id} ${username} ${password}`)

  UserModel.updateMany({_id: id}, {password: password}, {username: username})
  .then((result ) =>{ res.redirect('/')})
  .catch((error) => {
    console.log(error);
  });
});


// delete
app.post('/user/:id', (req, res) => {

  UserModel.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Document deleted");
      // Chuyển hướng đến app.get
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
})


// create
app.post('/user/list/formcommit/', (req, res) => {

  UserModel.create({
    username: req.body.username,
    password: req.body.password
  })
    .then((data) => { console.log('Them thanh cong ') })
    .catch((err) => { console.log('Loi ', err) })

    res.redirect('/')
});

// read
app.get('/', (req, res) => {
  UserModel.find({})
    .then((data) => { res.render('list-user', arrUser = data) })
    // .then((data) =>{res.send(data)})
    .catch((err) => { console.log('loi', err) })
})

app.get('/user/form/add', (req, res) =>{
  res.render('form-user', userEdit = null)
})

app.get('/user/form/edit/:id', (req, res) =>{
  const id = req.params.id

  UserModel.findOne({_id: id })
    .then((userFind) => { res.render('form-user', userEdit = userFind) })
    .catch((err) => { console.log('Loi ', err) })
})


app.listen(3000)