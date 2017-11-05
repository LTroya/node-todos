const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = '59ff75ea32376d3562cb0af011';

if (!ObjectId.isValid(id)) {
    console.log('Id not found');
} else {
    Todo.find({
        _id: id,
    }).then((todos) => {
        console.log('Todos', todos);
    });

    Todo.findOne({
        _id: id,
    }).then((todo) => {
        console.log('Todo', todo);
    });

    Todo.findById(id).then((todo) => {
        console.log('Todo by id', todo);
    }).catch(e => console.log('e', e));
}

