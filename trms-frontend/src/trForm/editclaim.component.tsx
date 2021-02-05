import { SyntheticEvent, useEffect } from 'react';
import './tr.css';
import trService from './tr.service';
import {withRouter, useHistory} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { TRState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim } from '../actions';
import { TRForm } from './trform';


interface Params {
    id: string;
}
// Function Component
function EditClaimComponent(props: RouteComponentProps<Params>) {
    const trSelector = (state: TRState) => state.claim;
    const claim = useSelector(trSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(props);
        console.log(props.match.params.id);
        trService.getClaimByName(props.match.params.id).then((rest)=> {
            console.log(rest);
            dispatch(changeClaim(rest));
        })
    }, [dispatch, props, props.match.params.id]);
    const FIELDS = ['date', 'time', 'grading', 'justification'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...claim };
        c[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        dispatch(changeClaim(c));
    }
    function submitForm() {
        trService.updateClaim(claim).then(() => {
            console.log(claim);
            dispatch(changeClaim(new TRForm()));
            console.log('Updating claim!')
            // call the callback function from the parent component so that it will re-render
            history.push('/claims');
        });
    }
    return (
        <div className='col tr card'>
            {claim.status = 'reimbursement pending'}
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'c_' + fieldName}
                            value={(claim as any)[fieldName]}
                            onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}
            <br/>
            <button className='btn btn-primary' onClick={submitForm}>
                Edit Claim
            </button>
        </div>
    );
}

export default withRouter(EditClaimComponent);
