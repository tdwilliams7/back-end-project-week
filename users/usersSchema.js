const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 11;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS).then(hashedPass => {
    this.password = hashedPass;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);