const { dbName,DB_URL } = require("./config");
const {MongoClient} = require('mongodb');
const { initPalmServices, convertToChecksum } = require("./services/palm");
const { logs } = require("./logger");

const checkSumFixes = async()=>{
    try {
        logs('info','checkSumFixes','Script starting')
        await initPalmServices()
        const client = new MongoClient(DB_URL)
        await client.connect()
        logs('info','checksumFixes',`Connected Succesfully to ${DB_URL}`)
        const db = client.db(dbName)
        const withdrawCollection = db.collection('nftwithdrawhistories')
        const records = await withdrawCollection.find({}).toArray()
        const totalCounts = records.length
        logs('info','checksumFixes',`Total Record count: ${totalCounts}`)
        console.time('checksumFix')
        for (let index = 0; index < totalCounts; index++) {
            const record = records[index]
            try {
            const externalAddress = record.externalAddress
            const checksumAddress = convertToChecksum(externalAddress)
            await withdrawCollection.updateOne({_id:record._id},
                {$set:{
                    externalAddress:checksumAddress
            }})
            logs('info','checksumFixes',`Completed verification for  id : ${record._id}`)
            } catch (error) {
                logs('error','checksumFixes',`${error.stack}, record: ${record._id}`)
            }
        }
        console.timeEnd('checksumFix')
        logs('info','checkSumFixes','Script completed')
        process.exit(0)
    } catch (error) {
        logs('error','checksumFixes',`${error.message}`)
        throw error
    }
}

checkSumFixes().catch(err=>{
    logs('error','checkSumFixes',`${err.stack}`)
})