const { DB_USER_NAME, DB_PASSWORD } = process.env;

exports.CONNECT_API = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@crowdfundme-cluster.829wazg.mongodb.net/CrowdFundMe-Database?retryWrites=true&w=majority`;
