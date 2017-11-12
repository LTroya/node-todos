const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [
    {
        _id: userOneId,
        email: 'troyaluis56@gmail.com',
        password: 'password',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
            },
        ],
    },
    {
        _id: userTwoId,
        email: 'jen@gmail.com',
        password: 'password2',
    },
];

const todos = [
    { _id: new ObjectId(), text: 'First test todo' },
    { _id: new ObjectId(), text: 'Second test todo', completed: true, completedAt: 123 },
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};