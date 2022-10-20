const mongoose = require('mongoose')
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

module.exports = async () => {
  if (!TEST_MONGODB_URI) {
    throw new Error('Test database connection url missing in the env.')
  }
  console.log('Connecting to test db ', TEST_MONGODB_URI)
  return mongoose.connect(TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
