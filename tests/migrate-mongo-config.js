/** In this file you can configure migrate-mongo */
require('dotenv').config()

const { TEST_MONGODB_URI, TEST_DB_NAME = 'geer-test' } = process.env
const migrateMongoConfig = {
  mongodb: {
    url: TEST_MONGODB_URI,
    databaseName: TEST_DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: './tests/migrations',
  changelogCollectionName: 'changelog'
}

module.exports = {
  migrateMongoConfig
}
