function Welcome() {


    return (
        <><h1>This is the welcome page</h1><h4>Register and login to try the app</h4><div className="todos">

            <div className="todo">

                <div className="checkbox"></div>

                <div className="text">Get the bread</div>

                <div className="delete-todo">x</div>

            </div>

            <div className="todo is-complete">

                <div className="checkbox"></div>

                <div className="text">Order a pizza</div>

                <div className="delete-todo">x</div>

            </div>

        </div>
            <div className="addPopup">+</div>
           </>
    );
}

export default Welcome;