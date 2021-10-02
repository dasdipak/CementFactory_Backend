const mongoose = require('mongoose');
// require('colors');

mongoose.connect('mongodb://127.0.0.1:27017/cementfactoryDB',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`Connected to mongoDb`);
})