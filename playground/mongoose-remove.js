const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = new ObjectId();

//Todo.remove({}).then(result => {
//    console.log('Result', result);
//});

//Todo.findOneAndRemove()
//Todo.FindByIdAndRemove()

//Todo.findOneAndRemove(_id);

Todo.findByIdAndRemove({_id: id}).then(todo => {
   console.log('Todo', todo);
}).catch(err => console.log('Err', err));
