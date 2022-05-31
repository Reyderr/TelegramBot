const fetch = require('node-fetch');
require('dotenv').config();
const youtubeToken = process.env.YOUTUBE_TOKEN;

function  createLinks(items) {
    var link = 'https://www.youtube.com/watch?v=';
    var links = [];

    for(const item of items){
        const l = link + item.id.videoId;
        links.push(l);
    }
    return  links;
}

const searchVideo = (query='', order = 'rating', videoDuration = 'medium', limiter = 1, cb) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoDuration=${videoDuration}&type=video&maxResults=${limiter}&q=${query}&key=${youtubeToken}`)
        .then(res => res.json())
        .then(json => cb(createLinks(json.items)))
        .catch(_ => {
            throw 'API error while fetching the data.'
        });
}
module.exports = {
    searchVideo
}