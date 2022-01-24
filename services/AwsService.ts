class AwsService {
    async uploadFile(file: File, folder: string) {
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/upload-url?file=${filename}&folder=${folder}`)
        const { url, fields } = await res.json()
        const formData = new FormData()

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            //@ts-ignore
            formData.append(key, value)
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (upload.ok) {
            console.log('Uploaded successfully!')
            return 'https://' + process.env.NEXT_PUBLIC_AWS_BUCKET_POPCOLLECTION_IMAGE + '.s3.' + process.env.NEXT_PUBLIC_AWS_REGION_POPCOLLECTION + '.amazonaws.com/' + folder + '/' + filename
        } else {
            console.error('Upload failed.')
        }
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
}

export default new AwsService()
