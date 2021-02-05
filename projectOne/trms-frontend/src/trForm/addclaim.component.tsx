import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { TRState } from '../reducer';
//import './restaurant.css';
import trService from './tr.service';
import { changeClaim } from '../actions';
import { TRForm } from './trform';

// This is the prop I want to connect from redux
const trProp = (state: TRState) => ({claim: state.claim});
// This is the dispatcher I want to use from redux
const mapDispatch = {
    updateClaim: (claim: TRForm) => changeClaim(claim),
};
// Put them in the connector
const connector = connect(trProp, mapDispatch);

// Function Component
// get the types of the props we created above so we can tell our component about them.
type PropsFromRedux = ConnectedProps<typeof connector>;

function AddClaimComponent(props: PropsFromRedux) {
    const FIELDS = ['employee_name', 'event_type', 'date', 'time', 'cost', 'location', 'description', 'justification'];
    const history = useHistory();
    // This function is going to handle my onChange event.
    // SyntheticEvent is how React simulates events.
    function handleFormInput(e: SyntheticEvent) {
        let c: any = { ...props.claim };
        c[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateClaim(c);
    }
    function submitForm() {
        trService.addClaim(props.claim).then(() => {
            props.updateClaim(new TRForm());
            // call the callback function from the parent component so that it will re-render
            history.push('/claims');
        });
    }
    return (
        <div className='col restaurant card'>
            {props.claim.status = 'pending'}
            {FIELDS.map((fieldName) => {
                return (
                    <div key={'input-field-' + fieldName}>
                        <label>{fieldName}</label>
                        <input
                            type='text'
                            className='form-control'
                            name={fieldName}
                            id={'c_' + fieldName}
                            value={(props.claim as any)[fieldName]}
                            onChange={handleFormInput}
                        ></input>
                    </div>
                );
            })}
            <br />
            <button className='btn btn-primary' onClick={submitForm}>
                Add Claim
            </button>
        </div>
    );
}

//connect my prop and dispatcher to my component
export default connector(AddClaimComponent);
