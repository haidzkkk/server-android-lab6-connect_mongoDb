const mongoose = require('mongoose');

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

    // find
    UserModel.find({
        // username: 'bekoi10a6'
    })
    .then((data) =>{console.log('data', data)})
    .catch((err) =>{console.log('loi', err)})

    
    // create
    // UserModel.create({
    //     username: 'dothanhhai',
    //     password: 'thanhhai'
    // })
    // .then((data) =>{console.log('Them thanh cong ', data)})
    // .catch((err) =>{console.log('Loi ', err)})

  