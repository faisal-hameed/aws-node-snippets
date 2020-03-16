const Config = require('./config');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Optional
// var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
// AWS.config.credentials = credentials;

// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    TableName: Config.DynamoDB.Table_Book.name,
    Item: {
        'id': { S: 'id-4' },
        'title': { S: 'Title-2' },
        'author': { S: 'Author-2' },
        'category': { S: 'Category-3' }
    }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});