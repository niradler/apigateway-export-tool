# apigateway-export-tool

## Usage CLI

```
Usage: apigateway-export-tool [options]

Options:
  -V, --version            output the version number
  -p, --path [path]        path (default: "D:\\Projects\\npm\\apigateway-export")
  -t, --exportType [type]  exportType (default: "swagger")
  -i, --restApiId <id>     restApiId
  -e, --extensions [ext]   extensions (default: "postman")
  -s, --stageName [stage]  stageName (default: "prod")
  -h, --help               output usage information
```

```
npx apigateway-export-tool -i 123123 -stageName prod
```

## Usage Nodejs

```
const { getExportAndSave,setAwsConfig } = require("apigateway-export-tool");
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
  const file = await getExportAndSave(params, filePath); //save the file in path.
  const file = await getExportAndSave(params); // just returning the file.
})();

```