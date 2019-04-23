//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html#getExport-property
const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const apigateway = new AWS.APIGateway({
  apiVersion: "2015-07-09",
  region: "us-east-1"
});

const getExport = params => {
  return new Promise((resolve, reject) => {
    apigateway.getExport(params, (err, data) => {
      if (err) {
        reject(err, err.stack);
      } else {
        resolve(data);
      }
    });
  });
};

const options = {
  exportType: ["oas30", "swagger"],
  restApiId: true,
  stageName: true,
  parameters: {
    extensions: ["postman", "integrations", "integrations", "authorizers"]
  }
};

const getExportAndSave = async (params, filePath) => {
  const res = await getExport(params);
  const file = JSON.parse(res.body);
  if (filePath) {
    fs.writeFileSync(
      path.join(process.cwd(), `${file.info.title}.json`),
      res.body
    );
  }

  return file;
};

module.exports = {
  getExportAndSave
};
