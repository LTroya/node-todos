//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    // deleteMany
    //db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(result => {
    //    console.log('Result', result);
    //});

    // deleteOne
    //db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => {
    //    console.log('Result', result);
    //});

    // findOneAndDelete
    //db.collection('Todos').findOneAndDelete({completed: true}).then(result => {
    //    console.log('Result', result);
    //});

    db.close();
});
