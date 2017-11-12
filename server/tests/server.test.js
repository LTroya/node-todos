const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toEqual(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectId();

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo by id', (done) => {
        const hexId = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toEqual(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then(todo => {
                    expect(todo).toBe(null);
                    done();
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectId();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should update the todo', (done) => {
        const text = 'Update from test';
        const todo = { ...todos[0], text, completed: true };

        request(app)
            .patch(`/todos/${todo._id}`)
            .send({ ...todo })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(typeof res.body.todo.completedAt).toBe('number');
                expect(res.body.todo.completed).toBe(true);
            })
            .end(done);
    });

    it('should clear completedAt when the todo is not completed', (done) => {
        const todo = { ...todos[1], completed: false };

        request(app)
            .patch(`/todos/${todo._id}`)
            .send({ ...todo })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completedAt).toBe(null);
                expect(res.body.todo.completed).toBe(false);
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(res => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        const email = 'example@gmail.com';
        const password = 'password';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect(res => {
                // For some reason toExist() method is not working as expected
                expect(typeof res.headers['x-auth']).toBe('string');
                expect(typeof res.body._id).toBe('string');
                expect(res.body.email).toBe(email);
            }).end(err => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then(user => {
                    expect(typeof user).toBe('object');
                    // toNotBe doesn't work as expected
                    // expect(user.password).toNotBe(password);
                    done();
                })
        });
    });

    it('should return validation errors if request invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'and',
                password: '123'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: '123456'
            })
            .expect(400)
            .end(done);
    });
});
