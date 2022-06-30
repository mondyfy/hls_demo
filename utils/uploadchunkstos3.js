require('dotenv').config()

const aws = require('aws-sdk')
const fs = require('fs');

// Add your aws s3 bucket credentials in env
const s3Creds = {
    accessKeyId: process.env['AWS_S3.ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_S3.SECRET_ACCESS_KEY'],
    bucketName: process.env['AWS_S3.BUCKET_NAME'],
};

const s3 = new aws.S3({
    accessKeyId: s3Creds.accessKeyId,
    secretAccessKey: s3Creds.secretAccessKey
})

fs.readdir('temp/chunks', (err, files) => {
    if (err) {
        return console.log('Failed to list directory: ' + err);
    }
    // TODO: maximum limit of batch process()
    // filename: /artist_name/YYYY/MM/DD/song_id/
    files.forEach(file => {

        const params = {
            Body: fs.createReadStream('temp/chunks/' + file),
            Bucket: s3Creds.bucketName,
            Key: `sandip_basnet/2022/06/30/11/${file}`,
            ACL: 'public-read',
        }

        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                const filePath = `temp/chunks/${file}`;
                fs.unlink(filePath, (err) => {
                    if (err && err.code == "ENOENT") {
                        console.info("Error! File doesn't exist.");
                    } else if (err) {
                        console.error("Something went wrong. Please try again later.");
                    } else {
                        console.info(`Successfully removed file with the path of ${filePath}`);
                    }
                });
            }
        });
    });
});
