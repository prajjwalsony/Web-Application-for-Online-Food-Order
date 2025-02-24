const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const db = require("./dataAccess");
// const { isNumberObject } = require("util/types");


const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
let PORT = 3000;

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({ STATUS: 'FAILED', MESSAGE: 'Malformed JSON' });
    }
    next();
});


app.post('/login', (req, res)=>{
    try{
        // console.log(1);
        let username = req.body.username;
        let password = req.body.password;
        // console.log(req.body);
        //also write a logic to check wether username is email and password follow its criteria
        if(username==="" || password==="" || username.includes(' ')){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        // console.log(3);
        let data = db.getUserData(username, password);
        res.send(JSON.stringify(data));

    }
    catch(error){
        console.log(4);
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
})




app.post('/register', (req, res)=>{
    try{
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let contact = req.body.contact;
        let address = req.body.address;
        let pin = address.pin;
        let city = address.city;
        let other = address.other;
        //also write a logic to check wether username is email and password follow its criteria
        if(password==="" || username==="" || name==="" || contact==="" || address==="" || username.includes(' ') || (/^[1-9]\d{9}$/).test(contact) == false  || (/^[1-9]\d{5}$/).test(pin) == false || city===""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        else{
            let RESULT = db.setUserData(username, password, name, contact, pin, city, other);
            res.send(JSON.stringify(RESULT)); 
        }

    }
    catch(error){
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
})


app.get('/restaurantList', async (req, res)=>{
    try{
        let data = await db.getRestaurantList();
        // console.log("await db.getRestaurantList()");
        if(data == null || typeof(data) == 'String' || data==""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        res.send(JSON.stringify(data));
    }
    catch(error){
        // console.log(error)
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
})

app.post('/getMenu', async (req, res)=>{
    try{
        let restaurantId = req.body.restaurantId;
        if(restaurantId === ""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        else{
            let data = await db.getMenu(restaurantId);
            res.send(JSON.stringify(data));
        }
    }
    catch(error){
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
})

app.post('/restaurantInfo', (req, res)=>{
    try{
        let restaurantId = req.body.restaurantId;
        if(restaurantId===""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        else{
            let data = db.getRestaurantInfo(restaurantId);
            res.send(JSON.stringify(data));
        }
    }
    catch(error){
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
})

app.post('/varifyMenu', (req, res)=>{
    try{
        let restaurantId = req.body.restaurantId;
        let menu= req.body.menu;
        if(restaurantId===""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        if(menu===""){
            res.send(JSON.stringify({'STATUS':'FAILED'}));
        }
        res.send(JSON.stringify(db.varifyMenu(JSON.parse(menu), restaurantId)));
    }
    catch(error){
        res.send(JSON.stringify({'STATUS':'FAILED'}));
    }
});




app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
})
