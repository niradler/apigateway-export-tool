#!/usr/bin/env node
const program = require("commander");
const {
  getExportAndSave,
  getRestApis,
  getSdkAndSave,
  getStages
} = require(".");
const package = require("./package.json");

program
  .version(package.version)
  .description("Download swagger file for a given restApiId.")
  .option("-p, --path [path]", "path", process.cwd())
  .option("-t, --exportType [type]", "exportType", "swagger")
  .option("-i, --restApiId <id>", "restApiId")
  .option("-e, --extensions [ext]", "extensions", "postman")
  .option("-s, --stageName [stage]", "stageName", "prod")
  .action(args => {
    const { path, exportType, restApiId, extensions, stageName } = args;
    const params = {
      exportType,
      restApiId,
      stageName,
      parameters: {
        extensions
      }
    };
    getExportAndSave(params, path)
      .then(() => process.exit())
      .catch(e => console.error(e));
  });

program
  .command("list")
  .description("list all restApis.")
  .option("-l, --limit [number]", "limit", 500)
  .action(args => {
    const { limit } = args.parent;

    getRestApis({
      limit
    })
      .then(apis => {
        console.log(apis.items.map(i => ({ id: i.id, name: i.name })));
        process.exit();
      })
      .catch(e => console.error(e));
  });

program
  .command("stages")
  .description("Get stages for a given restApiId.")
  .option("-i, --restApiId <id>", "restApiId")
  .action(args => {
    const { restApiId } = args.parent;

    getStages({
      restApiId
    })
      .then(stages => {
        console.log(
          stages.item.map(i => ({
            deploymentId: i.deploymentId,
            stageName: i.stageName
          }))
        );
        process.exit();
      })
      .catch(e => console.error(e));
  });

program
  .command("sdk")
  .description("Download sdk for a given restApiId and stage.")
  .option("-i, --restApiId <id>", "restApiId")
  .option("-t, --sdkType [type]", "sdkType", "javascript")
  .option("-s, --stageName <stage>", "stageName")
  .option("-p, --path [path]", "path", process.cwd())
  .action(args => {
    const { restApiId, stageName } = args.parent;
    const { sdkType, path } = args;
    getSdkAndSave({ restApiId, sdkType, stageName }, path)
      .then(sdk => {
        process.exit();
      })
      .catch(e => console.error(e));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
