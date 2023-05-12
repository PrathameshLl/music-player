
global_songs = [];

async function fetchMusic() {

    const response =  await fetch("music/getSongs", options).then(response => response.json())
    console.log(response.songs);
        global_songs =  response.songs;

        Amplitude.init({
            songs: global_songs,

            "bindings": {
                31: "play_pause",
            }
    
        });

}

fetchMusic();





console.log("hello world")