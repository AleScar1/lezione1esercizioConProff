import mongoose from 'mongoose';

// Schema utente
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: String, required: true, default: false }
});

// Modello
const userModel = mongoose.model('users', userSchema);


export default userModel;


//password utente 
/*
{
    "username": "johnsmith",
    "password": "PassworD101212!@"
  }
*/