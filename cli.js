#!/usr/bin/env node
const program = require("commander");
const { getExportAndSave, getRestApis } = require(".");
const package = require("./package.json");
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
  .version(package.version)
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

program
  .command("list")
  .option("-l, --limit [number]", "limit", 500)
  .action(args => {
    const { limit } = args;
    getRestApis({
      limit
    })
      .then(apis => {
        console.log(apis.items.map(i => ({ id: i.id, name: i.name })));
        process.exit();
      })
      .catch(e => console.error(e));
  });
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
