const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db_uri = "mongodb+srv://romif:OW69ZleXRZfObhRS@cluster0.k1h7bvo.mongodb.net/mern-todo?retryWrites=true&w=majority";

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {

    try {
        const todos = await Todo.find();

        res.json(todos);

    } catch (err) {
        console.error;
        res.status(500).json({ error: err.message || 'An error occurred' });
    }
});


app.post('/todo/new', (req, res) => {

    try {
        const todo = new Todo({
            text: req.body.text
        });

        todo.save();

        res.json(todo);
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

app.listen(3001, () => console.log("Server started on port 3001"));