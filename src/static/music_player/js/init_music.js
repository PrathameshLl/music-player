console.log("initialize music");


fetch("music/getSongs", options).then((response => {
    return response.json();
})).then((response => {
    console.log(response.songs);
    Amplitude.init({
        songs: response.songs,

        "bindings": {
            31: "play_pause",
        }
    });


}));




console.log("hello world")