
import { useState, useEffect } from 'react';

const BackendPort = process.env.PORT || 3001;


const API_BASE = 'https://todolist-api-lj47.onrender.com';


function UserTodos() {

    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
    }, []);

    const GetTodos = () => {
        fetch('https://todolist-api-lj47.onrender.com/todos', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err));
    };

    const completeTodo = async id => {
        const data = await fetch("https://todolist-api-lj47.onrender.com/todo/complete/" + id, {
            method: 'PUT'
        })
            .then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }));
    };

    const deleteTodo = async id => {
        const data = await fetch("https://todolist-api-lj47.onrender.com/todo/delete/" + id, {
            method: 'DELETE'
        })
            .then(res => res.json());
        setTodos(todos => todos.filter(todo => todo._id !== data._id));
    };

    const addTodo = async () => {
        const data = await fetch("https://todolist-api-lj47.onrender.com/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            }),
            credentials: 'include'
        }).then(res => res.json());

        setTodos([...todos, data]);

        setPopupActive(false);
        setNewTodo("");
    }


    return (
        <><h1>Welcome</h1><h4>Your Tasks</h4><div className="todos">
            {todos.map(todo => (
                <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id}>

                    <div className="checkbox" onClick={() => completeTodo(todo._id)}></div>

                    <div className="text">{todo.text}</div>

                    <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>

                </div>
            ))}
        </div>
            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input type="text"
                            className="add-todo-input"
                            onChange={e => setNewTodo(e.target.value)}
                            value={newTodo} />
                        <div className="button" onClick={addTodo}>Create Task</div>
                    </div>
                </div>
            ) : ''}</>
    );
}

export default UserTodos;