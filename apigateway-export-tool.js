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
  .command("docs")
  .description("Download docs file for a given restApiId.")
  .option("-p, --path [path]", "path", "./")
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
  .description("List all restApis.")
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

program
  .command("stages")
  .description("Get stages for a given restApiId.")
  .option("-i, --restApiId <id>", "restApiId")
  .action(args => {
    const { restApiId } = args;

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
  .description("Download sdk for a given restApiId.")
  .option("-i, --restApiId <id>", "restApiId")
  .option("-t, --sdkType [type]", "sdkType", "javascript")
  .option("-s, --stageName [stage]", "stageName", "prod")
  .option("-p, --path [path]", "path", "./")
  .action(args => {
    const { sdkType, path, stageName, restApiId } = args;
    getSdkAndSave({ restApiId, sdkType, stageName }, path)
      .then(sdk => {
        process.exit();
      })
      .catch(e => console.error(e));
  });

program.parse(process.argv);

program.on("command:*", function() {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

if (!process.argv.slice(2).length) {
  program.help();
}
