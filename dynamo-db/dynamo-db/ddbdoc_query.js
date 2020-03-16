// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

var params = {
    ExpressionAttributeValues: {
        ':id': 'id-3',
        ':auth': 'Author-3'
    },
    KeyConditionExpression: 'id = :id',
    ProjectionExpression: 'id, author, title, category',
    FilterExpression: 'contains (author, :auth)',
    TableName: Config.DynamoDB.Table_Book.name,
    ScanIndexForward: false, // sort order 
    Limit: 1
};

docClient.query(params, function (err, data) {
    console.log('Scanned Count : ' + data.ScannedCount);
    console.log('Count : ' + data.Count);
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Items);
    }
});