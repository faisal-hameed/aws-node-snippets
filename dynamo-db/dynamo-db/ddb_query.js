//https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    ExpressionAttributeValues: {
        ':id': { S: 'id-2' },
        ':cat': { S: 'Category-2' }
    },
    KeyConditionExpression: 'id = :id ',
    ProjectionExpression: 'id, author, title, category',
    FilterExpression: 'contains (category, :cat)',
    TableName: Config.DynamoDB.Table_Book.name
};

ddb.query(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        //console.log("Success", data.Items);
        console.log('Scanned Count : ' + data.ScannedCount);
        console.log('Count : ' + data.Count);
        data.Items.forEach(function (element, index, array) {
            console.log(JSON.stringify(element));
        });
    }
});