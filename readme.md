# HLS Demo NodeJs

## Steps to be followed

1. Clone the repo:

```
git clone https://github.com/mondyfy/hls_demo.git && cd hls_demo
```

2. Install dependencies:

```
npm i
```

3. Add songs inside songs folder

4. Install ffmpeg on your system

```
sudo apt install ffmpeg
```

5. Make temp/chunks folder

```
mkdir 'temp/chunks'
```

6. Covert mp3 to chunks

```
node utils/mp3tohlschunks.js
```

7. If you want to upload chunk files to s3 then add s3 credentials in utils/uploadchunkstos3.js and run:

```
node utils/uploadchunkstos3.js
```

## In order or test the streams

Start the server with npm 
```
npm run start
```

and request http://127.0.0.1:8000/0.m3u8 the manifest file will be downloaded, here to play the file you have to add one browser extension i.e. [Native HLS Playback](https://chrome.google.com/webstore/detail/native-hls-playback/emnphkkblegpebimobpbekeedfgemhof), that should play the media file you have used. In the meantime, you can inspect the file sequence chunks requested by the client/browser from the server after every 10 seconds the chunk has been loaded.
