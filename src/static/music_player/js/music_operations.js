const controller = new AbortController();
async function searchSongs(search_term) {


    client_access_token = "idlmURq2pS53tfC3HHpR13SBS6ioaZDaeZOHxyrQ2jNwlCOff4x-jItyLzTnJlw5"
    url = `http://api.genius.com/search?q=${search_term}&access_token=${client_access_token}`


    const response = await fetch(url).then(res => res.json())
    const songs = response.response.hits.map((song_obj) => {
        return song_obj.result;
    });
    return songs;
};


async function getSongDetails(song_id) {
    url = `http://api.genius.com/songs/${song_id}?access_token=${client_access_token}`
    const response = await fetch(url).then(res => res.json())
    const song = response.response.song;
    return song;
}