import {HttpsOptions} from "firebase-functions/v2/https";

/** VPC Settings */
const httpsOptions: HttpsOptions = {
  memory: "512MiB",
};

export default () => ({
  httpsOptions,
  firestore: {
    testTable: {
      name: "test_table",
      dbName: "test_db",
    },
  },
});
