import React from 'react';
import TRComponent from './tr.component';
import { TRForm} from './trform';

type PropType = { claims: TRForm[]};

function TRRow(props: PropType) {
    //console.log(props);
    return (
        <section className="row border border-secondary">
            {props.claims.map((claim: TRForm, index: number) => 
                <TRComponent key = {'claim-'+index} data = {claim}></TRComponent>)}
        </section>
    );
  }
  
  export default TRRow;
