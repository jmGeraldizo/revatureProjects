import React, { useEffect } from 'react';
import './App.css';
import RouterComponent from './router.component';
import userService from './user/user.service';
import { useDispatch } from 'react-redux';
import { getUser } from './actions';
import { BrowserRouter } from 'react-router-dom';

function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        userService.getLogin().then((user) => {
            console.log(user);
            dispatch(getUser(user));
        });
    }, [dispatch]);

    return (
        // I'm using the context to provide that state to the children of this component.
        <div className='container'>
            <BrowserRouter>
                <RouterComponent></RouterComponent>
            </BrowserRouter>
        </div>
    );
}

export default App;
