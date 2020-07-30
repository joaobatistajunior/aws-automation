const AWS = require('aws-sdk');

const AWS_REGION = '<YOUR_AWS_REGION>';
const AWS_INSTANCE_ID = ['<YOU_EC2_INSTANCE_ID>'];

AWS.config.update({ region: AWS_REGION });
let ec2 = new AWS.EC2();

async function handleStartingEC2Instance() {
    console.log('Starting instance task started...');
    await ec2.startInstances({ InstanceIds: AWS_INSTANCE_ID }).promise();
    console.log(`Starting task completed. Instance ${AWS_INSTANCE_ID}`);
}

async function handleStoppingEC2Instance() {
    console.log('Stopping instance task started...');
    await ec2.stopInstances({ InstanceIds: AWS_INSTANCE_ID }).promise();
    console.log(`Stopping task completed. Instance ${AWS_INSTANCE_ID}`);
}

exports.handler = async (event) => {
    try {
        console.log(`Received event: ${JSON.stringify(event)}`);
        if (event.action === 'start') {
            await handleStartingEC2Instance();
        }
        if (event.action === 'stop') {
            await handleStoppingEC2Instance();
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify('Event finished!'),
        };
        return response;
    } catch (e) {
        throw e;
    }
};
