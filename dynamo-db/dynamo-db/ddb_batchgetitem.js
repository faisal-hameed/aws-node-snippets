const Config = require('./config');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: Config.AWS.region });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
    RequestItems: {
        'BookTable': {
            Keys: [
                { 'id': { S: 'id-1' }, 'title': { S: 'Title-2' } },
                { 'id': { S: 'id-2' }, 'title': { S: 'Title-2' } }
            ],
            ProjectionExpression: 'id, title, author, category'
        }
    }
};

ddb.batchGetItem(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        data.Responses.BookTable.forEach(function (element, index, array) {
            console.log(element);
        });
    }
});