const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const userController = require('./controllers/UserController');
const foodTypeController = require('./controllers/FoodTypeController');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.post ('/api/foodType/create',(req,res) => 
    foodTypeController.create(req,res)
);
app.post('/api/user/signIn', (req, res)=> 
    userController.signin(req,res)
);
app.get('/api/foodType/list',(req,res)=>
    foodTypeController.list(req, res)
);


app.listen(3000,()=>{
    console.log('API Server Running...');
})
