const fetch = require('node-fetch');
require('dotenv').config();
const youtubeToken = process.env.YOUTUBE_TOKEN;

/* Order value
    date – Resources are sorted in reverse chronological order based on the date they were created.
    rating – Resources are sorted from highest to lowest rating.
    relevance – Resources are sorted based on their relevance to the search query. This is the default value for this parameter.
    title – Resources are sorted alphabetically by title.
    videoCount – Channels are sorted in descending order of their number of uploaded videos.
    viewCount – Resources are sorted from highest to lowest number of views. For live broadcasts, videos are sorted by number of concurrent viewers while the broadcasts are ongoing.
*/
const order = 'rating';


/*  VideoDuration value
    any – Do not filter video search results based on their duration. This is the default value.
    long – Only include videos longer than 20 minutes.
    medium – Only include videos that are between four and 20 minutes long (inclusive).
    short – Only include videos that are less than four minutes long.
*/

const videoDuration = 'medium';


function  createLinks(id) {
    var link = 'https://www.youtube.com/watch?v=';
    return  link + id.videoId;
}

const searchVideo = (query='', limiter,cb) =>
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoDuration=${videoDuration}&type=video&maxResults=${limiter}&q=${query}&key=${youtubeToken}`)
        .then(res => res.json())
        .then(json => cb(createLinks(json.items[0].id)))
        .catch(_ => {
            throw 'API error while fetching the data.'
        });

module.exports = {
    searchVideo
}