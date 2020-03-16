const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    TableName: Config.DynamoDB.Table_Book.name,
    // Must provide both (partition key and sort key)
    Key: {
        'id': { S: 'id-1' },
        'title': { S: 'Title-2' }
    },
    // ProjectionExpression: 'title'
};

// Call DynamoDB to read the item from the table
ddb.getItem(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Item);
    }
});