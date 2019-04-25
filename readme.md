# apigateway-export-tool

## Usage CLI

```
Usage: apigateway-export-tool [options]

Options:
  -V, --version     output the version number
  -h, --help        output usage information

Commands:
  docs [options]    Download docs file for a given restApiId.
  list [options]    List all restApis.
  stages [options]  Get stages for a given restApiId.
  sdk [options]     Download sdk for a given restApiId.
```

```
npx apigateway-export-tool list
npx apigateway-export-tool docs -i 123123 -stageName prod
```

## Usage Nodejs

```
// checkout examples https://github.com/niradler/apigateway-export-tool/blob/master/test.js
const { getExportAndSave,
  getExport,
  setAwsConfig,
  getRestApis,
  getSdk,
  getSdkAndSave,
  getStages,
  importDocumentation
  } = require("apigateway-export-tool");
setAwsConfig({ region: "us-east-1" });

(async function() {
  const params = {
    exportType, // String ("oas30", "swagger")
    restApiId, // String
    stageName, // String
    parameters: {
      extensions // String ("postman", "integrations", "integrations", "authorizers")
    }
  };
  const filePath = "./";
  const apis = await getRestApis();
  const apis = await getStages(params);
  const apis = await importDocumentation(params);
  const file = await getExportAndSave(params, filePath); //save the file in path.
  const file = await getExport(params); // just returning the file.
})();

```
