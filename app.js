const express = require('express');
const mongoose = require('mongoose'); 

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Lab5')
  .then(() => console.log('Connected!'));

    const Schema = mongoose.Schema;

    const user = new Schema({
        username: String,
        password: String,
    }, {
        collection: 'User'
    });

    const UserModel = mongoose.model('user', user);


    app.post('/user', (req, res) => {
        // const newUser = new UserModel(req.body);
        // newUser.save()
        //   .then(user => {
        //     res.json(user);
        //   })
        //   .catch(err => {
        //     res.status(500).json({ error: err.message });
        //   });

        UserModel.create({
        username: req.body.username,
        password: req.body.password
        })
        .then((data) =>{console.log('Them thanh cong ')})
        .catch((err) =>{console.log('Loi ', err)})

        UserModel.find({})
        .then((data) =>{res.send('data: ' + data)})
        .catch((err) =>{console.log('loi', err)})
      });

app.listen(3000)