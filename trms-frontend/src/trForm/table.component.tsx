import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRForm } from './trform';
import TRRow from './trrow.component';
import {TRState} from '../reducer'
import { thunkGetClaims} from '../thunks';
import './tr.css';

function groupIntoThrees(claims: TRForm[]): TRForm[] [] {
    let arr: TRForm[][] = [];
    for (let i = 0; i < claims.length / 3; i++) {
        arr.push(claims.slice(i * 3, (i + 1) * 3));
    }

    return arr;
}
export default function TableComponent() {
     // Create a constant that is of the type of state.restaurants
     const selectClaim = (state: TRState) => state.claims;
     // Retrieve the restaurants array from redux.
     const claims = useSelector(selectClaim);
     // Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
     const dispatch = useDispatch();
     let arr: TRForm[][] = [];
     console.log(arr);
 
     useEffect(() => {
         dispatch(thunkGetClaims())
     }, [dispatch]);

    return (
        <section className='claims container' id='claims'>
           {groupIntoThrees(claims).map((value, index: number) => {
                return (
                    <TRRow
                        key={'rest-row-' + index}
                        claims={value}
                    ></TRRow>
                );
            })}

        </section>
    );
}