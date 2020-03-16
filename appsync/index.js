"use strict";
/**
* This shows how to use standard Apollo client on Node.js
*/

// POLYFILLS
global.WebSocket = require('ws');
global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true }
};
global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports');

// Require AppSync module
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;

// If you want to use AWS...
const AWS = require('aws-sdk');
AWS.config.update({
    region: aws_exports.REGION,
});

// Import gql helper and craft a GraphQL query
const gql = require('graphql-tag');
const query = gql(`
query {
    listTodos(limit: 20) {
        todos {
          id
          name
          description
          priority
          status
          comments {
            todoid
            commentid
            content
          }
        }
        nextToken
    }
}`);

// Set up a subscription query
const subquery = gql(`
subscription onCreateTodo {
    onCreateTodo
        {
            id
            name
            description
            priority
            status
            comments {
                todoid
                commentid
                content
            }
        }
}`);

// Set up Apollo client
const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
        type: aws_exports.AUTH_TYPE,
        apiKey: aws_exports.API_KEY,
    },
    disableOffline: false      //Uncomment for AWS Lambda
});

console.log('AppSync client version : ' + client.version)

client.hydrated().then(function (client) {
    //Now run a query
    client.query({ query: query, })
        //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        .then(function logData(data) {

            if (data.data) {
                const resp = data.data.listTodos.todos;
                resp.forEach(element => {
                    console.log('Item : ' + JSON.stringify(element));
                });
            }
            console.log(data.loading);

        })
        .catch(console.error);

    //Now subscribe to results
    const observable = client.subscribe({ query: subquery });

    const realtimeResults = function realtimeResults(data) {
        console.log('realtime data: ', data);
    };

    observable.subscribe({
        next: realtimeResults,
        complete: console.log,
        error: console.log,
    });
});