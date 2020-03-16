const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    ExpressionAttributeValues: {
        ':c': { S: 'Category-2' },
        ':t': { S: 'Title-2' }
    },
    KeyConditionExpression: "category = :c",
    ProjectionExpression: 'id, author, title, category',
    FilterExpression: 'contains (title, :t)',
    TableName: Config.DynamoDB.Table_Book.name,
    IndexName: "category-index" // Index
};

ddb.query(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        //console.log("Success", data.Items);
        data.Items.forEach(function (element, index, array) {
            console.log(JSON.stringify(element));
        });
    }
});
