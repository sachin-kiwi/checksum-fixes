const { initPalmServices, createAccount,isValidAddress,isValidCheckSum,convertToChecksum } = require("../src/services/palm")
const chai = require('chai')
const validCheckSumAddress='0xdC4b2051cB106D5dE8601B36936A3DA99c634c29'
const invalidCheckSumAddress='0xdc4b2051cb106d5de8601b36936a3da99c634c29'
describe('checksum TEST SUIT', async function () {
  before(async () => {
    await initPalmServices()
    console.log('checksum testing initiated...')
  })

  it('create palm account',async()=>{
    const data = await createAccount()
    chai.expect(data).to.have.keys(['address','privateKey'])
  })

  it('check for invalid address',async()=>{
    const data = await isValidAddress('')
    chai.expect(data).to.be.false
  })

  it('check for valid address',async()=>{
    const resp = await createAccount()
    const data = await isValidAddress(resp.address)
    chai.expect(data).to.be.true
  })

  it('check for valid checksum address',async()=>{
    const data = await isValidCheckSum(validCheckSumAddress)
    chai.expect(data).to.be.true
  })


  it('Case 1 check for invalid checksum address (all lowercase)',async()=>{
    const invalidCheckSumAddress = validCheckSumAddress.toLowerCase()
    const data = await isValidCheckSum(invalidCheckSumAddress)
    chai.expect(validCheckSumAddress).to.not.eq(invalidCheckSumAddress)
    chai.expect(data).to.be.false
  })

  it('Case 2 check for invalid checksum address (all uppercase)',async()=>{
    const invalidCheckSumAddress = validCheckSumAddress.toUpperCase()
    const data = await isValidCheckSum(invalidCheckSumAddress)
    chai.expect(validCheckSumAddress).to.not.eq(invalidCheckSumAddress)
    chai.expect(data).to.be.false
  })

  it('Convert to invalid checksum address to valid one and both must not match',async()=>{
    const address = '0x24e4f8d09ade1bdb1e314750b759c0bbc0ca9d51'
    const data = await convertToChecksum(address)
    chai.expect(data).not.to.be.eq(address)
  })
  after(async () => {
    console.log('checksum testing done...')
  })
})
