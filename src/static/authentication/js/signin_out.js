// $("#left-section").css("background-image",`url(${image_url})`);

lastfm_api_key = "c1c59680a0b7e5e6fdeabda760eec019";


async function getTopArtist(lastfm_api_key) {
    url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c1c59680a0b7e5e6fdeabda760eec019&format=json`;
    const response = await fetch(url).then(res => res.json());

    return response.artists.artist;
}


getTopArtist(lastfm_api_key).then((response) => {
    artist = response[Math.floor(Math.random() * response.length)]
    getArtistImage(artist.mbid).then((image) => {
        (image);
    });
});


async function getArtistImage(mbid) {
    const musicbanz_url = `http://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`;

    const m = await fetch(musicbanz_url).then((res) => res.json());

    for (let i = 0; i < m.relations.length; i++) {
        if (m.relations[i].type === "image") {
            let image_url = m.relations[i].url.resource;
            if (image_url.startsWith("https://commons.wikimedia.org/wiki/File:")) {
                const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
                image_url = "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + filename;
                return image_url;
            }
            return image_url;
        }
    }

    return false;

}