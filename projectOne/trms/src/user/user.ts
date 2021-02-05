import logger from '../log';
import userService from './user.service';

export interface Reimbursements{
    pending: number;
    available: number;
    awarded: number;
}

export class User {
    username: string = '';
    password: string = '';
    role: string = '';
    reimbursements? : Reimbursements[];
}

// login function that checks if username and password are equal to what's stored in db
export async function login(username: string, password: string): Promise<User|null> {
    logger.debug(`${username +' '+ password}`);
    return await userService.getUserByName(username).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    });
}