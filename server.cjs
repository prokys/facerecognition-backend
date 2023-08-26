const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    // bcrypt.compare("apples", "$2a$10$/O9un0MvgTmjRUDABgFvQO7VUxodPqkbUPjt.Pl6xIdulZXDf408K", function (err, res){
    //     console.log("first guess: ", res);
    // })
    // bcrypt.compare("oragnes", "$2a$10$/O9un0MvgTmjRUDABgFvQO7VUxodPqkbUPjt.Pl6xIdulZXDf408K", function (err, res){
    //     console.log("second: ", res);
    // })
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('succes');
    }else{
        res.status(400).json("error loging in");
    }

})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err,hash){
        console.log(hash);
    })
    database.users.push({
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found){
        res.status(400).json("not found");
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status(400).json("not found");
    }
})

app.listen(3000, ()=> {
console.log("app is running on port 3000");
})

/*
/ -> res = this is working
/signin -> POST = succes/fail
/register -> POST = user
/profile/:userId -> get = user
/image -> PUT = user
*/