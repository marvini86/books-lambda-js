var aws = require('aws-sdk')

var sqs = new aws.SQS({
  endpoint: `http://localhost:4566`, 
  accessKeyId: "fml", secretAccessKey: "ffs", 
  region: "us-east-1", 
  apiVersion: '2012-11-05'
});

exports.send = async (book) => {
      var params = {
        MessageBody: JSON.stringify(book),
        QueueUrl: "http://localhost:4566/000000000000/books",
      };
   
      await sqs.sendMessage(params).promise();
}