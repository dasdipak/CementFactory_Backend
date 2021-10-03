const User = require('../entity/userModel');
const mongoose = require('mongoose');
 
const url= 'mongodb://127.0.0.1:27017/airpollution_db';
 
beforeAll(async() =>{
await mongoose.connect(url, {
useNewUrlParser:true,
useCreateIndex:true
});
});
 
afterAll(async() =>{
await mongoose.connection.close();
});
describe('Test to User Model', () =>{

it('Add User', () =>{
const user= {
fullname:'Dipak Das',
phoneNumber:'das',
username:'Dipak',
email:"dasdipak@gmail.com",
password:"das123",
photo: 'picname.png'
};
return User.create(user)
    .then((pro_ret) =>{
    expect(pro_ret.email).toEqual('dasdipak@gmail.com');
});
});
  

it('Test to View User profile', async() =>{
    const status= await User.find({_id:Object('607ecbb42b31fd19d82f2179')});
    expect(status.ok)
    });

it('to test while delete the user is working or not', async() =>{
    const status= await User.deleteOne({_id :Object('607ecbb42b31fd19d82f2179')});
    expect(status.ok).toBe(1);
    });
});
