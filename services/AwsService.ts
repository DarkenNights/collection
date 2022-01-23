import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

class AwsService {
    public accessKey: string = process.env.AWS_ACCESS_KEY
    public secretKey: string = process.env.AWS_SECRET_KEY
    public bucketName: string
    public regionName: string
    public bucket: AWS.S3

    constructor(bucketName: string, regionName: string, accessKey: string = process.env.AWS_ACCESS_KEY, secretKey: string = process.env.AWS_SECRET_KEY) {
        this.accessKey = accessKey
        this.secretKey = secretKey
        this.bucketName = bucketName
        this.regionName = regionName
        this.bucket = new AWS.S3({
            params: { Bucket: this.bucketName },
            region: this.regionName,
        })
    }

    async uploadFile(file: File | undefined, folder: string) {
        const fileName = file && file.name ? file.name : 'error'
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: this.bucket + '/' + folder,
            Key: fileName
        }

        const objectUrl = 'https://' + this.bucketName + '.s3.' + this.regionName + '.amazonaws.com/' + folder + '/' + fileName

        // await this.myBucket.putObject(params).send((err, response) => {
        //   if (err) console.log(err)
        // })
        await this.bucket.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)
        })

        return objectUrl
    }

    // async removeFile(fileName: string, folder: string) {
    //     const params = {
    //         Bucket: this.S3_BUCKET + '/' + folder,
    //         Key: fileName,
    //     }
    //
    //     this.myBucket.deleteObject(params).send((err) => {
    //         if (err) console.log(err)
    //     })
    // }

    async createBucket(name: string, region: string) {
        const s3 = new AWS.S3({
            accessKeyId: this.accessKey,
            secretAccessKey: this.secretKey
        });
        const params = {
            Bucket: name,
            CreateBucketConfiguration: {
                LocationConstraint: region
            }
        }
        s3.createBucket(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('Bucket Created Successfully', data.Location);
        });
    }


}

export default new AwsService(process.env.AWS_BUCKET_IMAGE, 'eu-west-3')
