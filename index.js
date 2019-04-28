const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
const Joi = require("joi");

const awsConfig = {
  apiVersion: "2015-07-09",
  region: "us-east-1"
};

const setAwsConfig = (opt = {}) => {
  for (const key in opt) {
    awsConfig[key] = opt[key];
  }
};

const schema = Joi.object().keys({
  exportType: Joi.string()
    .default("swagger")
    .allow(["oas30", "swagger"]),
  restApiId: Joi.string().required(),
  stageName: Joi.string().required(),
  parameters: Joi.object().keys({
    extensions: Joi.string()
      .default("postman")
      .allow(["postman", "integrations", "integrations", "authorizers"])
  })
});

const getExport = params => {
  const apigateway = new AWS.APIGateway(awsConfig);

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

const getExportAndSave = async (params, filePath) => {
  const { error, value } = Joi.validate(params, schema);
  if (error) throw new Error(error.message);
  params = value;
  const res = await getExport(params);
  const file = JSON.parse(res.body);
  if (filePath) {
    const ext =
      params.exportType && params.exportType === "oas30" ? "yml" : "json";
    const pathToSave = path.isAbsolute(filePath)
      ? path.join(filePath, `${file.info.title}.${ext}`)
      : path.join(process.cwd(), filePath, `${file.info.title}.${ext}`);
    fs.writeFileSync(pathToSave, res.body);
  }

  return file;
};

const getRestApis = (
  params = {
    limit: 500
  }
) => {
  const apigateway = new AWS.APIGateway(awsConfig);

  return new Promise((resolve, reject) => {
    apigateway.getRestApis(params, (err, data) => {
      if (err) reject(err, err.stack);
      else resolve(data);
    });
  });
};

const getStages = params => {
  const apigateway = new AWS.APIGateway(awsConfig);

  return new Promise((resolve, reject) => {
    apigateway.getStages(params, (err, data) => {
      if (err) reject(err, err.stack);
      else resolve(data);
    });
  });
};

const importDocumentation = params => {
  const apigateway = new AWS.APIGateway(awsConfig);

  return new Promise((resolve, reject) => {
    apigateway.importDocumentationParts(params, (err, data) => {
      if (err) reject(err, err.stack);
      else resolve(data);
    });
  });
};

const getSdk = params => {
  const apigateway = new AWS.APIGateway(awsConfig);

  return new Promise((resolve, reject) => {
    apigateway.getSdk(params, (err, data) => {
      if (err) reject(err, err.stack);
      else resolve(data);
    });
  });
};

const getSdkAndSave = async (params, filePath) => {
  const sdk = await getSdk(params);
  if (filePath) {
    fs.writeFileSync(
      path.join(process.cwd(), filePath, `${params.sdkType}.zip`),
      sdk.body
    );
  }
  if (filePath) {
    const ext = "zip";
    const pathToSave = path.isAbsolute(filePath)
      ? path.join(filePath, `${params.sdkType}.${ext}`)
      : path.join(process.cwd(), filePath, `${params.sdkType}.${ext}`);
    fs.writeFileSync(pathToSave, res.body);
  }

  return sdk;
};

module.exports = {
  setAwsConfig,
  getExport,
  getExportAndSave,
  getRestApis,
  getStages,
  importDocumentation,
  getSdk,
  getSdkAndSave
};
