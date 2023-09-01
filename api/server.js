const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;

const salt = bcrypt.genSaltSync(10);
const secret = ('vrcezr6fcererf4154r');

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

const db_uri = "mongodb+srv://romif:JYTa1MBiIgG1vsO2@cluster0.k1h7bvo.mongodb.net/mern-todo?retryWrites=true&w=majority";


mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


app.get('/', (req, res) => {
    console.log('backend is running');
});

const path = require('path');
const User = require(path.join(__dirname, './models/User'));

app.post('/register', async (req, res) => {
    try {
        const { newUser, newPassword } = req.body;
        const user = await User.create({ Username: newUser, Password: bcrypt.hashSync(newPassword, salt) });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'An error occurred' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ Username: username });
        const passOk = bcrypt.compareSync(password, user.Password);
        if (passOk) {
            jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: user._id,
                    username
                });
            });
        } else {
            res.status(400).json('Wrong credentials');
        }

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'An error occurred' });
    }
});



app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

const Todo = require(path.join(__dirname, './models/Todo'));

app.get('/todos', async (req, res) => {

    try {
        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
        const todos = await Todo.find({user: info.id});

        res.json(todos);
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'An error occurred' });
    }
});

app.post('/todo/new', async (req, res) => {

    try {
        const { token } = req.cookies;


        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
          
            const todo = new Todo({
                text: req.body.text,
                user: info.id
            });
    
           await todo.save();
            res.json(todo);
        });
    } catch (err) {
        console.error;
        res.status(500).json({ error: err.message || 'An error occurred' });
    }
});

app.delete('/todo/delete/:id', async (req, res) => {

    try {
        const result = await Todo.findByIdAndDelete(req.params.id);

        res.json(result);
    } catch (err) {
        console.error;
        res.status(500).json({ error: err.message || 'An error occurred' });
    }
});

app.put('/todo/complete/:id', async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id);

        todo.complete = !todo.complete;

        todo.save();

        res.json(todo);
    } catch (err) {
        console.error;
        res.status(500).json({ error: err.message || 'An error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));