import logger from '../log';
import trService from './tr.service';

export class TRForm {
    employee_name: string = '';
    date: string = '';
    time: string = '';
    location: string = '';
    description: string = '';
    cost: number = 0;
    event_type: string = '';
    grading: string = '';
    justification: string = '';
    status: string = 'pending';
}

export function displayClaims(emp_name: string, callback: Function) {
    logger.trace('displayClaims called!');
    trService.getClaimByName(emp_name).then((item) =>{
        logger.debug(item);
        console.log(item as TRForm);
        callback();
    }).catch((error) => {
        logger.error(error);
    });
}