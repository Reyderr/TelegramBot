const fetch = require('node-fetch');
require('dotenv').config();
const youtubeToken = process.env.YOUTUBE_TOKEN;

function  createLinks(id) {
    var link = 'https://www.youtube.com/watch?v=';
    return  link + id.videoId;
}

const searchVideo = (query='', limiter,cb) =>
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoDuration=medium&type=video&maxResults=${limiter}&q=${query}&key=${youtubeToken}`)
        .then(res => res.json())
        .then(json => cb(createLinks(json.items[0].id)))
        .catch(_ => {
            throw 'API error while fetching the data.'
        });

module.exports = {
    searchVideo
}