import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/ddbDoc';
import logger from '../log';
import { TRForm } from './trform';

class TRService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dynamo.ts
    }

    // adding a new claim to the table
    async addClaim(claim: TRForm): Promise<boolean> {
        let params = {
            TableName: 'tr_form',
            Item: claim,
        };

        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created claim');
            //console.log(result);
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async getClaimByName(empname: string): Promise<TRForm | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'tr_form',
            Key: {
                'employee_name': empname,
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
                return data.Item as TRForm;
            } else {
                return null;
            }
        });
    }

    async getClaims(): Promise<TRForm[]> {
        const params = {
            TableName: 'tr_form'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as TRForm[];
        }).catch((err) => {
            logger.error(err);
            return [];
        });
    }

    async updateStatus(claim: TRForm): Promise<boolean> {
        const params = {
            TableName: 'tr_form',
            Key: {
                'employee_name': claim.employee_name
            },
            ExpressionAttributeNames: {
                '#stat': 'status'
            },
            UpdateExpression: 'set #stat = :s',
            ExpressionAttributeValues: {
                ':s': claim.status
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.info('Successfully updated status.');
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }

    async updateClaim(claim: TRForm): Promise<boolean> {
        const params = {
            TableName: 'tr_form',
            Key: {
                'employee_name': claim.employee_name
            },
            ExpressionAttributeNames: {
                '#just': 'justification',
                '#grade': 'grading',
                '#time': 'time',
                '#date': 'date',
                '#st': 'status'
            },
            UpdateExpression: 'set #date = :d, #time = :t, #grade = :g, #just = :j, #st = :s', 
            ExpressionAttributeValues: {
                ':d': claim.date,
                ':t': claim.time,
                ':g': claim.grading,
                ':j': claim.justification,
                ':s': claim.status
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.info('Successfully updated claim.');
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }

    async deleteClaim(id: string): Promise<boolean> {
        const params = {
            TableName: 'tr_form',
            Key: {
                'employee_name': id
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }


}

const trService = new TRService();
export default trService;