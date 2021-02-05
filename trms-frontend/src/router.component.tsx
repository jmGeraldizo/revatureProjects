import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import LoginComponent from './user/login.component';
import userService from './user/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions';
import { UserState } from './reducer';
import { User } from './user/user';
import TableComponent from './trForm/table.component';
import AddClaimComponent from './trForm/addclaim.component';
import EditClaimComponent from './trForm/editclaim.component';
import DetailsComponent from './trForm/details.component';
import EditStatusComponent from './trForm/editstatus.component';
//import ErrorBoundaryComponent from './error.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    //const location = useLocation();
    function logout() {
        userService.logout().then(() => {
            dispatch(getUser(new User()));
        });
    }
    return (
        <div>
            <header>
                <h1>J9'S TRMS</h1>
                <nav id='nav'>
                    <ul>
                        {user.role === 'Employee' && (
                            <li>
                                <Link to='/addClaim'>TR Form</Link>
                            </li>
                        )}
                        {user.role === 'Employee' && (
                            <li>
                                <Link to='/myClaim'>View My Claim</Link>
                            </li>
                        )}
                        {user.username && user.role !== 'Employee' && (
                            <li>
                                <Link to='/claims'>View claims</Link>
                            </li>
                        )}
                        <li>
                            {user.username ? (
                                <button className='btn btn-danger' onClick={logout}>
                                    Logout
                                </button>
                            ) : (
                                    <Link to='/login'>Login</Link>
                                )}
                        </li>
                    </ul>
                </nav>
                <div id='trForm'></div>
            </header>
            <Route
                path='/addClaim'
                render={() =>
                    user.role !== 'Employee' ? (
                        <Redirect to='/claims' />
                    ) : (
                            <AddClaimComponent />
                        )
                }
            />

            <Route
                exact path='/myClaim'
                render={() =>
                    user.role === 'Employee' ? (
                        <TableComponent/>
                    ) : (
                        <Redirect to='/' />
                        )
                }
            />

            <Route
                exact
                path='/claims/:id'
                component={DetailsComponent}
            />
            <Route
                exact path='/claims'
                render={() =>
                    user.role !== 'Employee' ? (
                        <TableComponent />

                    ) : (
                            <Redirect to='/login' />
                        )
                }
            />
            <Route path='/login' component={LoginComponent} />
            <Route
                exact
                path='/claims/:id/edit'
                component={EditClaimComponent}
            />
            <Route
                exact
                path='/claims/:id/status'
                component={EditStatusComponent}
            />
        </div>
    );
}
