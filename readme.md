# HLS Demo NodeJs

## Steps to be followed
1. Clone the repo:
```
    git clone https://github.com/mondyfy/hls_demo.git
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
    mkdir temp/chunks
```

6. Covert mp3 to chunks
```
    node utils/mp3tohlschunks.js
```

7. If you want to upload chunk files to s3 then add s3 credentials in utils/uploadchunkstos3.js and run:
```
    node utils/uploadchunkstos3.js
```

