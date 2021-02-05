import { SyntheticEvent } from 'react';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../actions';

// Function Component
function LoginComponent(props: any) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.username = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(loginAction(u));
    }
    function submitForm() {
        userService.login(user).then((user) => {
            dispatch(getUser(user));
            console.log(user); 
            history.push('/claims');
        });
    }
    return (
        
        <div className='form-group'>
           <label htmlFor="username" className="inputs">Username</label> <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           <label htmlFor="password" className="inputs">Password </label><input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='btn btn-outline-dark' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
