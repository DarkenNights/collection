import AWS from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_POPCOLLECTION,
        secretAccessKey: process.env.AWS_SECRET_KEY_POPCOLLECTION,
        region: process.env.AWS_REGION_POPCOLLECTION,
        signatureVersion: 'v4',
    })

    const s3 = new AWS.S3()
    const post = await s3.createPresignedPost({
        Bucket: process.env.AWS_BUCKET_POPCOLLECTION_IMAGE,
        Fields: {
            key: req.query.folder + '/' + req.query.file,
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    })

    res.status(200).json(post)
}
