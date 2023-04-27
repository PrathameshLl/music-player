console.log("initialize music")


Amplitude.init({
    songs:[
       {    
            "name":"Mystary Of Love",
            "artist":"Sufiyan Stevens",
            "url":"/mediafiles/songs/mystery_of_love.mp3",
            "cover_art_url":"/mediafiles/album_cover/sufjan.jpg",
            "album":"Call Me By Your Name"
        },
        {
            "name":"Paranoid Android",
            "artist":"Radiohead",
            "url":"/mediafiles/songs/ParanoidAndroid.mp3",
            "cover_art_url":"/mediafiles/album_cover/okcomputer.png",
            "album":"Ok Computer"
        },
        {
            "name":"Jigsaw Falling into Place",
            "artist":"Radiohead",
            "url":"/mediafiles/songs/jigsaw_falling.mp3",
            "cover_art_url":"/mediafiles/album_cover/inrainbowscover.png",
            "album":"In Rainbow",
        },
        
    ],

    "bindings":{
        32: "play_pause",
    }

});

console.log("hello world")