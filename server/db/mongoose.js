const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI);

module.exports = { mongoose };
