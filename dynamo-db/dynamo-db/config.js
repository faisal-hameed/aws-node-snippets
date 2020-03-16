const AWS = {
    region: 'us-east-1'
}

const DynamoDB = {
    Table_Book: {
        name: 'BookTable',
        keys: {
            id: 'id',
            title: 'title',
            author: 'author',
        }
    }
}

module.exports = {
    AWS,
    DynamoDB
}