function Welcome() {


    return (
        <><h1>Register and login to try the app</h1><h4>Here are a few todos examples</h4><div className="todos">

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