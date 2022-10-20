const WEB3 = require('web3')
const { PALM_HTTP_PROVIDER } = require('../config')
const { logs } = require('../logger')

let web3 = null

const initPalmServices = async () => {
  const methodName = '[initPalmServices]'
  try {
    logs('info', methodName, '=============palm connecting===========')
    web3 = new WEB3(new WEB3.providers.HttpProvider(PALM_HTTP_PROVIDER))
    const message =
      PALM_HTTP_PROVIDER +
      ` Connect to web3 ${web3 !== null} `
    logs('info', methodName, message)
    logs('info', methodName, '=============palm connnected===========')
  } catch (error) {
    logs('info', methodName, 'Issue with connecting', `${error.stack}`)
    throw error
  }
}


const createAccount = async () => {
  const {address,privateKey} = web3.eth.accounts.create()
  return { address,privateKey }
}

const isValidAddress = (address) => web3.utils.isAddress(address)

const convertToChecksum = (address) => web3.utils.toChecksumAddress(address)

const isValidCheckSum = (address) => web3.utils.checkAddressChecksum(address)


module.exports = {
  initPalmServices,
  createAccount,
  isValidAddress,
  convertToChecksum,
  isValidCheckSum,
}