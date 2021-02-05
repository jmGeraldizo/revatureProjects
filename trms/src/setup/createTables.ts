import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import logger from '../log';
import trService from '../trForm/tr.service';
import { TRForm } from '../trForm/trform';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}

const removeTRForm = {
    TableName: 'tr_form'
}

//tr table
const trTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'employee_name',
            AttributeType: 'S'
        },
        {
            AttributeName: 'event_type',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'employee_name',
            KeyType: 'HASH'
        }
        // {
        //     AttributeName: 'event_type',
        //     KeyType: 'RANGE'
        // }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'tr_form',
    StreamSpecification: {
        StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'EventModelIndex',
            KeySchema: [
                {
                    AttributeName: 'employee_name',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'event_type',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 3,
                WriteCapacityUnits: 3
            }
        }
    ]
};

//delete tr table if it exists, then create
ddb.deleteTable(removeTRForm, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(trTableSchema, (err, data) => {
            if (err) {
                // log the error
                logger.debug(err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populatetrTable();
                }, 20000);
            }
        });
    }, 5000);
});

//users table
const userTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

//delete users table if it exists, then create
ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userTableSchema, (err, data) => {
            if (err) {
                // log the error
                logger.debug(err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
}); 

//add items to users table
function populateUserTable() {
    userService.addUser({username: 'Janine', password: 'pass', role: 'Employee', reimbursements: []}).then(()=>{});
    userService.addUser({username: 'Gail', password: 'pass1', role: 'Supervisor', reimbursements: []}).then(()=>{});
    userService.addUser({username: 'Myles', password: 'pass2', role: 'Department Head', reimbursements: []}).then(()=>{});
    userService.addUser({username: 'Nero', password: 'pass3', role: 'BenCo', reimbursements: []}).then(()=>{});
    userService.addUser({username: 'Lianne', password: 'pass4', role: 'Employee', reimbursements: []}).then(()=>{});
}


let claim: TRForm = {
    event_type: 'University Courses',
    employee_name: 'Janine',
    date: '1-09-2021',
    time: '10:00',
    location: 'New Jersey',
    description: 'math class',
    cost: 500,
    grading: '',
    justification: '',
    status: 'pending'
}
/* let claim1: TRForm = {
    event_type: 'University Courses',
    employee_name: 'Lianne',
    date: '1-12-2021',
    time: '03:52',
    location: 'New York',
    description: 'python class',
    cost: 550,
    justification: ''
}
let claim2: TRForm = {
    event_type: 'Seminars',
    employee_name: 'Janine',
    date: '1-12-2021',
    time: '04:03',
    location: 'Chicago',
    description: 'soft skills seminar',
    cost: 200,
    justification: ''
} */
//add items to tr table
function populatetrTable() {
    trService.addClaim(claim).then(()=>{});
    /* trService.addClaim(claim1).then(()=>{});
    trService.addClaim(claim2).then(()=>{}); */
}