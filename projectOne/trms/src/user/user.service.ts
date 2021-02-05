import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/ddbDoc';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    // adding a new user to the table
    async addUser(user: User): Promise<boolean> {
        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'users',
            // Item - the object we are sending
            Item: user,
            ConditionExpression: '#username <> :username',
            ExpressionAttributeNames: {
                '#username': 'username'
            },
            ExpressionAttributeValues: {
                ':username': user.username
            }
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    // using the GetItem api to get users by name
    async getUserByName(username: string): Promise<User | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as User;
            } else {
                return null;
            }
        });
    }

    async updateReimbursement(user: User): Promise<boolean> {
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            ExpressionAttributeNames: {
                '#reimb': 'reimbursements'
            },
            UpdateExpression: 'set #reimb = :r',
            ExpressionAttributeValues: {
                ':r': user.reimbursements
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.info('Successfully updated reimbursements.');
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService();
export default userService;
