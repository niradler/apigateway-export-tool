const {
  getExportAndSave,
  getExport,
  setAwsConfig,
  getRestApis,
  getSdk,
  getSdkAndSave,
  getStages,
  importDocumentation
} = require(".");

const params = {
  restApiId: "9172pqnobj",
  stageName: "prod"
};

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const file = await getExportAndSave(params);
    if (file) {
      if (file.info.title) {
        console.log("get file complete!");
      }
    } else {
      throw new Error("get file failed!");
    }
  } catch (error) {
    console.error(error);
  }
})();

(async function() {
  try {
    await getExport({});
    throw new Error("wrong param failed!");
  } catch (error) {
    if (
      error.message ==
      'child "restApiId" fails because ["restApiId" is required]'
    ) {
      console.log("wrong param complete!");
    } else {
      console.error(error);
    }
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-2" });
    await getExportAndSave(params);
    console.log("wrong aws config failed!");
  } catch (error) {
    if (error.message == "Invalid stage identifier specified") {
      console.log("wrong aws config complete!");
    } else {
      console.error(error);
    }
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const apis = await getRestApis();
    console.log("apis", apis);
  } catch (error) {
    console.error(error);
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const stages = await getStages({ restApiId: params.restApiId });
    console.log("stages", stages);
  } catch (error) {
    console.error(error);
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const param = {
      restApiId: params.restApiId,
      sdkType: "javascript",
      stageName: "prod"
    };
    const sdk = await getSdk(param);

    console.log("sdk", sdk);
  } catch (error) {
    console.error(error);
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const param = {
      restApiId: params.restApiId,
      sdkType: "javascript",
      stageName: "prod"
    };
    const sdk = await getSdkAndSave(param, "./test");

    console.log("sdk saved", sdk);
  } catch (error) {
    console.error(error);
  }
})();

(async function() {
  try {
    setAwsConfig({ region: "us-east-1" });
    const body = await getExportAndSave(params);
    const doc = await importDocumentation({
      restApiId: params.restApiId,
      body
    });
    console.log("doc", doc);
  } catch (error) {
    console.error(error);
  }
})();
