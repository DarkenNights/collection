import sdk from 'aws-sdk'

sdk.config.update({
    accessKeyId: 'AKIAZP64XEEG6LRQFY4R',
    //AKIATCTW4ER4W37S3RAV
    //TEST:AKIATCTW4ER46C2F7LLT
    secretAccessKey: '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',
    //yYSKXSRn99RHN6mgpTypdyCPcXk9CY2bwQPX8FDP
    //TEST: 53s6aKbRDhMRCwB08g82SIQeKRF7YcVVfPc3a30V
})

class AWS {
    S3_BUCKET = 'popuniversecollection'
    REGION = 'eu-west-3'

    myBucket = new sdk.S3({
        params: { Bucket: this.S3_BUCKET },
        region: this.REGION,
    })

    async uploadFile(file: File | undefined, folder: string) {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: this.S3_BUCKET + '/' + folder,
            Key: file && file.name ? file.name : 'error',
        }

        const objectUrl = 'https://' + this.S3_BUCKET + '.s3.' + this.REGION + '.amazonaws.com/' + folder + '/' + file?.name

        await this.myBucket.putObject(params, function (err) {
            if (err) console.log(err, err.stack)
        })

        return objectUrl
    }

    async removeFile(fileName: string, folder: string) {
        const params = {
            Bucket: this.S3_BUCKET + '/' + folder,
            Key: fileName,
        }

        this.myBucket.deleteObject(params).send((err) => {
            if (err) console.log(err)
        })
    }
}

export default new AWS()
