const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs');

const { getVideoDurationInSeconds } = require('get-video-duration')
const makeLink = (text,target) => {return `<a href="${target}" >${text}</a>` };

const baseURL = "http://localhost:8080";


const makeRlogUrl = (number,drive) => { return `${baseURL}/static/${drive}--${number}/rlog.bz2`}
const makeQcameraUrl = (number,drive) => { return `${baseURL}/static/${drive}--${number}/qcamera.ts`}

const staticPath = '/data/routes';

const getAllDrives = ()=> {
    const t = fs.readdirSync(staticPath)
    let mapped = t.map(obj => {
        const temp = obj.split("--");
        return [`${temp[0]}--${temp[1]}`, Number(temp[2])]
    })

    let drives = new Map(mapped.filter(obj => obj[1] === 0));
    const rest = mapped.filter(obj => obj[1] > 0);

    rest.forEach(obj => drives.set(obj[0], drives.get(obj[0]) + 1))

    return drives
}



app.use('/static', express.static(staticPath))



app.get('/', (req, res) => {
    let str = ""
    let drives = getAllDrives();

    drives.forEach((value,key,map) => str += `${makeLink(`${key} ${value}`,`/cabana/index.html?retropilotIdentifier=${key}&retropilotHost=http://localhost:8080/`)} <br/> ` ); //exact cabana link

    res.send(str);
})

app.get('/useradmin/cabana_drive/:target',(req,res) =>{
    const drives = getAllDrives();

    const target = req.params["target"];

    if(!drives.has(target)){
        return res.send("err");
    }
    const endId = drives.get(target);

    //log urls for rlogs
    let logUrls = [];
    for(let i = 0; i<= endId; i++){
        logUrls.push(makeRlogUrl(i,target));
    }

    let result = {};

    result.logUrls = logUrls;

    result.driveUrl = `${baseURL}/qcameram3u8/${target}`;
    result.name = target;
    result.driveIdentifier = target;
    result.dongleId ="xxxxx";


    res.send(result);
})

app.get('/qcameram3u8/:target/qcamera.m3u8',async (req,res) =>{
    const drives = getAllDrives();

    const target = req.params["target"];

    if(!drives.has(target)){
        return res.send("err");
    }
    const endId = drives.get(target);

    //log urls for rlogs
    let qcamstr = "";

    for(let i = 0; i< endId; i++){
        qcamstr += `#EXTINF:60,${i}\n`;
        qcamstr += `${makeQcameraUrl(i,target)}\n`;
    }

    let lastDuration = await getVideoDurationInSeconds(`${staticPath}/${target}--${endId}/qcamera.ts`);
    lastDuration = Math.ceil(lastDuration);
    console.log(lastDuration);
    qcamstr += `#EXTINF:${lastDuration},${endId}\n`;
    qcamstr += `${makeQcameraUrl(endId,target)}\n`;


    let result = `#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:61\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-PLAYLIST-TYPE:VOD\n${qcamstr}\n#EXT-X-ENDLIST`;

    res.status(200).set('Content-Type', 'application/vnd.apple.mpegurl');

    res.send(result);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
