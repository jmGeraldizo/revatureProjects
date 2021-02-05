import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../user/user.service'
import { UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Reimbursements } from '../user/user';

interface ReimbursementProps {
    cost: number;
    evtype: string;
    username: string;
}

export default function CalculateReimbursementComponent(props: ReimbursementProps) {
    const userContext = useSelector((state: UserState) => state.user);
    // console.log(userContext);
    //const dispatch = useDispatch();
    const history = useHistory();
    const total = 1000;

    console.log(props);
    let pendingReimbursement = 0;

    function calculate() {
        if (props.evtype === 'University Courses') {
            pendingReimbursement = props.cost * 0.8;
        } else if (props.evtype === 'Seminars') {
            pendingReimbursement = props.cost * 0.6;
        } else if (props.evtype === 'Certification Preparation Classes') {
            pendingReimbursement = props.cost * 0.75;
        } else if (props.evtype === 'Certification') {
            pendingReimbursement = props.cost;
        } else if (props.evtype === 'Technical Training') {
            pendingReimbursement = props.cost * 0.9
        } else {
            pendingReimbursement = props.cost * 0.3;
        }

        return pendingReimbursement;
    }
    calculate()
    let reim: Reimbursements = {
        pending: pendingReimbursement,
        available: total - pendingReimbursement,
        awarded: pendingReimbursement
    }
    console.log(reim);
    // useEffect(() => {
    //     console.log(props);
    //     userService.getClaimByName(props.username).then((user) => {
    //         console.log(user);
    //         dispatch(updateUser(user));
    //     })
    // }, [dispatch, props, props.username]);

    function submitForm() {
        userService.getClaimByName(props.username).then((user) => {
            user.reimbursements?.forEach((us) => {

                let reim: Reimbursements = {
                    pending: pendingReimbursement,
                    available: total - pendingReimbursement - us.awarded,
                    awarded: us.awarded + pendingReimbursement
                    }
                })

                user.reimbursements?.push(reim);
                console.log(user.reimbursements);
                userService.updateReimbursement(user).then(() => {
                    //dispatch(updateUser(new User()));
                    console.log('Updating reimbursements!')
                    // call the callback function from the parent component so that it will re-render
                    history.push(`claims/${props.username}`);
                });
            })    
    }
    console.log(userContext);
    return (
            <div>
                <p>{pendingReimbursement}</p>
                <button className='btn btn-outline-dark' onClick={submitForm}>
                    Calculate Reimbursement
            </button>
            </div>
        )
    }
