const fetch = require('node-fetch');
const youtubeToken = "AIzaSyDDpQKeop36bE_lZRJOat2M8M31cyLeNWY";

function  createLink(id = '') {
    var link = '';
    link = `https://www.youtube.com/watch?v=${id}`;
    return link;
}

const searchVideo = (query='', limiter,cb) =>
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${limiter}&q=${query}&key=${youtubeToken}`)
        .then(res => res.json())
        .then(json => cb(createLink(json.items[0].id.videoId)))
        .catch(_ => {
            throw 'API error while fetching the data.'
        });

module.exports = {
    searchVideo
}