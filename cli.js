#!/usr/bin/env node
const program = require("commander");
const { getExportAndSave } = require(".");
const importApiGatewayDocFile = ({
  path,
  exportType,
  restApiId,
  extensions,
  stageName
}) => {
  const params = {
    exportType,
    restApiId,
    stageName,
    parameters: {
      extensions
    }
  };
  return getExportAndSave(params, path);
};

program
  .version("0.0.2")
  .option("-p, --path [path]", "path", process.cwd())
  .option("-t, --exportType [type]", "exportType", "swagger")
  .option("-i, --restApiId <id>", "restApiId")
  .option("-e, --extensions [ext]", "extensions", "postman")
  .option("-s, --stageName [stage]", "stageName", "prod")
  .action(args => {
    const { path, exportType, restApiId, extensions, stageName } = args;
    importApiGatewayDocFile({
      path,
      exportType,
      restApiId,
      extensions,
      stageName
    })
      .then(() => process.exit())
      .catch(e => console.error(e));
  });

program.parse(process.argv);
