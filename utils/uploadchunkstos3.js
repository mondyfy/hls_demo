const aws = require('aws-sdk')
const fs = require('fs');

// Add your aws s3 bucket credentials
const s3Creds = {
    accessKeyId: "",
    secretAccessKey: "",
    bucketName: "",
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
            Bucket: secretAccessKey.bucketName,
            Key: `manish_pradhan/2022/05/04/01/${file}`,
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
