import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import trService from './tr.service';
import { TRState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim } from '../actions';
import CalculateReimbursementComponent from './calcreimburse.component';
import './tr.css';
import { TRForm } from './trform';

interface DetailsProps {
    match: any;
}

export default function DetailsComponent(
    props: DetailsProps
) {
    const trSelector = (state: TRState) => state.claim;
    const cl = useSelector(trSelector);
    const userContext = useSelector((state: UserState) => state.user);
    console.log(userContext);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log(props.match.params.id);
        console.log(userContext);
        console.log(props);
        trService.getClaimByName(props.match.params.id).then((cl) => {
            console.log('claim ' + cl);
            dispatch(changeClaim(cl));
        })
    }, [dispatch, props.match.params.id]);

    function handleDelete() {
        trService.deleteClaim(cl.employee_name).then(() => {
            dispatch(changeClaim(new TRForm()))
            history.push('/claims');
        });
    }

    return (
        <div className='col tr card border border-dark'>
            <div className='card-body'>
                <p className='empname'>Employee Name : {cl.employee_name}</p>
                <p className='evtype'>Event Type: {cl.event_type}</p>
                <p className='date'>Date: {cl.date}</p>
                <p className='time'>Time: {cl.time}</p>
                <p className='location'>Location: {cl.location}</p>
                <p className='desc'>Description: {cl.description}</p>
                <p className='justification'>Justification: {cl.justification}</p>
                <p className='status'>Status: {cl.status}</p>
                Reimbursements: {userContext.reimbursements?.map((item) => {
                    return (
                        <>
                            <p>Available: {item.available}</p>
                            <p>Awarded: {item.awarded}</p>
                            <p>Pending: {item.pending}</p>
                        </>
                    )
                })}
            </div>
            {userContext.role === 'Employee' && (
                <>
                    <Link
                        className='btn btn-outline-primary'
                        to={'/claims/' + cl.employee_name + '/edit'}
                    >
                        Edit Claim
                    </Link>
                    <br/>
                    <button className='btn btn-outline-danger' onClick={handleDelete}>
                        Delete Claim
                    </button>
                </>
            )}
            {userContext.role === 'Supervisor' && cl.status === 'pending' && (
                <>
                    <Link
                        className='btn btn-dark'
                        to={'/claims/' + cl.employee_name + '/status'}
                    >
                        Supervisor Aprroval
                    </Link>
                </>
            )}
            {userContext.role === 'Department Head' && cl.status === 'supervisor approved' && (
                <>
                    <Link
                        className='btn btn-outline-dark'
                        to={'/claims/' + cl.employee_name + '/status'}
                    >
                        Department Head Approval
                    </Link>
                </>
            )}
            {userContext.role === 'BenCo' && (cl.status === 'department head approved' || cl.status === 'reimbursement pending') && (
                <>
                    <Link
                        className='btn btn-outline-dark'
                        to={'/claims/' + cl.employee_name + '/status'}
                    >
                        BenCo Approval
                    </Link>
                    <CalculateReimbursementComponent cost={cl.cost} evtype={cl.event_type} username={cl.employee_name}></CalculateReimbursementComponent>
                </>
            )}
        </div>
    );
}