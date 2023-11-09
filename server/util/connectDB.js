// Get Database variables
require("dotenv").config({ path: ".env" });
const { DB_USER_NAME, DB_PASSWORD } = process.env;

exports.CONNECT_API = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@crowdfundme-cluster.829wazg.mongodb.net/?retryWrites=true&w=majority`;
