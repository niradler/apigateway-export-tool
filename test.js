const { getExportAndSave, setAwsConfig, getRestApis } = require(".");

const params = {
  restApiId: "testid",
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
    await getExportAndSave({});
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
    console.log("items", apis);
  } catch (error) {
    console.error(error);
  }
})();
