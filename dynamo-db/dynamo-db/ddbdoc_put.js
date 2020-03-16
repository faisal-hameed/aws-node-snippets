const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

var params = {
    TableName: Config.DynamoDB.Table_Book.name,
    Item: {
        id: 'id-5',
        title: 'Title-5',
        author: 'Author-5',
        category: 'Category-5'
    }
};

docClient.put(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});
