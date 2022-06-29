'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../songs');
const dest = path.join(__dirname, '../temp/chunks');

const startTime = new Date();
console.info('> Start reading files', startTime);

fs.readdir(dir, (readDirError, files) => {
	if (readDirError) {
		console.error(readDirError);

		return;
	}

	const countFiles = files.length;
	files.map(async (file, index) => { 
		const fileName = path.join(dir, file);
		// const fileName = 'https://songsnepal-api-dev.s3.ap-south-1.amazonaws.com/1651641657743.mp3';

		const indexName = index < 10 ? `00${index}` : index < 100 ? `0${index}` : index < 1000 ? index : index;
		const { err, stdout, stderr } =
			await exec(`ffmpeg -i ${fileName} -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls  ${dest}/${index}.m3u8`);

		if (err) {
			console.log(err);
		}

		if (countFiles - 1 === index) {
			const endTime = new Date();
			console.info('< End Preparing files', endTime);
		}
	});
});