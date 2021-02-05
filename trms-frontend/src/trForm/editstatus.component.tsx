import { SyntheticEvent, useEffect } from 'react';
import './tr.css';
import trService from './tr.service';
import { withRouter, useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { TRState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim } from '../actions';
import { TRForm } from './trform';

interface Params {
    id: string;
}
// Function Component
function EditStatusComponent(props: RouteComponentProps<Params>) {
    const trSelector = (state: TRState) => state.claim;
    const claim = useSelector(trSelector);

    const userContext = useSelector((state: UserState) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props);
        console.log(props.match.params.id);
        trService.getClaimByName(props.match.params.id).then((rest) => {
            console.log(rest);
            dispatch(changeClaim(rest));
        })
    }, [dispatch, props, props.match.params.id]);
    const FIELDS = ['status'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        c[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        console.log(c);
        dispatch(changeClaim(c));
    }
    function submitForm() {
        trService.updateStatus(claim).then(() => {
            dispatch(changeClaim(new TRForm()));
            console.log('Updating claim!')
            // call the callback function from the parent component so that it will re-render
            history.push('/claims');
        });
    }
    return (
        <div className='col tr card'>
            {userContext.role === 'Supervisor' && (
                <>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='status' onChange={handleFormInput}>
                        <option>Approve/deny</option>
                        <option value='denied'>deny</option>
                        <option value='supervisor approved'>approve</option>
                    </select>
                </>
            )}
            {userContext.role === 'Department Head' && (
                <>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='status' onChange={handleFormInput}>
                        <option>Approve/deny</option>
                        <option value='denied'>deny</option>
                        <option value='department head approved'>approve</option>
                    </select>
                </>
            )}
            {userContext.role === 'BenCo' && (
                <>
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='status' onChange={handleFormInput}>
                        <option>Approve/deny</option>
                        <option value='denied'>deny</option>
                        <option value='waiting for grade'>approve for grading</option>
                        <option value='BenCo approved'>approve</option>
                    </select>
                </>
            )}
            <button className='btn btn-outline-dark' onClick={submitForm}>
                Edit Claim
            </button>
        </div>
    );
}

export default withRouter(EditStatusComponent)