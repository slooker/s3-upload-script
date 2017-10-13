const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const blob = fs.readFileSync('./recording.webm')
const filename = 'e8ad4270-177e-461e-aacf-8816fcc48966.webm'

const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.IAM_ACCESS_KEY,
    secretAccessKey: process.env.IAM_SECRET
  }
})
const params = {
  Body: blob,
  Bucket: process.env.S3_BUCKET,
  Key: `/events/${filename}`
}
console.info(`blob size: ${params.Body.length}`)
console.info(`Bucket: ${params.Bucket}`)
console.info(`Key: ${params.Key}`)

s3.putObject(params, (err, data) => {
  if (err) {
    console.error('Error writing to s3', err)
  }
  console.info('Write to s3 successful', data)
})
