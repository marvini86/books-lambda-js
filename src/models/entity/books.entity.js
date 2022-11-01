const dynamoose = require('dynamoose');
const { NODE_ENV } = process.env

dynamoose.aws.sdk.config.update({
  region: 'us-east-1'
});


if (NODE_ENV == "dev") dynamoose.aws.ddb.local('http://localhost:4566');

const bookSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  title: {
    type: String,
  },
  isbn: {
    type: String,
  },
  authors: {
    type: Set,
    schema: [String] ,
  },
});

module.exports = dynamoose.model('Books', bookSchema);