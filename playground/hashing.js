const bcrypt = require('bcryptjs');

const password = '1234';

//bcrypt.genSalt(10, (err, salt) => {
//    bcrypt.hash(password, salt, (err, hash) => {
//        console.log('Hash', hash);
//    })
//});

var hashedPassword = '$2a$10$G85zX4aVIbOPXASwOYPeK.wIg0iWSXU2LMbyVG60jEgqqgURddXhu';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log('Result', res);
});

//const data = {
//    id: 10,
//};
//
//const token = jwt.sign(data, '123abc');
//console.log('Token', token);
//
//const decoded = jwt.verify(token, '123abc');
//console.log('Decoded', decoded);

//const message = 'I am user number 3';
//const hash = SHA256(message).toString();
//
//console.log('Message:', message);
//console.log('Hash', hash);
//
//const data = {
//    id: 4,
//};
//const token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'some_secret').toString(),
//};
//
////token.data.id = 5;
////token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//const resultHash = SHA256(JSON.stringify(token.data) + 'some_secret').toString();
//if (resultHash === token.hash) {
//    console.log('Data was not changed');
//} else {
//    console.log('Data was changed. Do not trust');
//}
