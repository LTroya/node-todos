//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    //db.collection('Todos').findOneAndUpdate({
    //    _id: new ObjectID('59fea19585ab052e64abd2e1'),
    //}, {
    //    $set: {
    //        completed: false
    //    }
    //}, {
    //    returnOriginal: false
    //}).then(result => {
    //    console.log('Result', result);
    //});

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59fe984b0877e32e55b54307'),
    }, {
        $set: {
            name: 'Kafai Oh'
        },
        $inc: {
            age: 2 
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log('Result', result);
    });

    db.close();
});
