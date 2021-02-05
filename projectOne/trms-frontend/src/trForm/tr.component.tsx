import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './tr.css';
import { TRForm } from './trform';

interface TRProps {
    data: TRForm;
}

function TRComponent(props: TRProps) {

    // function goToClaim() {
    //     history.push('/claims/'+props.data.employee_name);
    // }

    return (
        <div className='col tr card'>
            <p className='name'>Employee Name: {props.data.employee_name}</p>
            <p className='eventtype'>Event Type: {props.data.event_type}</p>
            <p className='date'>Date: {props.data.date}</p>
            <p className='time'>Time: {props.data.time}</p>
            <Link to={`/claims/${props.data.employee_name}`}>
                {' '}
                {props.data.status}{' '}
            </Link>
        </div>
    );
}

export default TRComponent;
