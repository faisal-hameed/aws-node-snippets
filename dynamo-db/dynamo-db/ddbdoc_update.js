const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

var params = {
    TableName: Config.DynamoDB.Table_Book.name,
    Key: {
        id: 'id-1',
        title: 'Title-2'
    },
    UpdateExpression: 'set author = :a, category = :c',
    ExpressionAttributeValues: {
        ':a': 'NEW_TITLE',
        ':c': 'NEW_SUBTITLE'
    },
    ReturnValues: "ALL_NEW"
};

docClient.update(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});
