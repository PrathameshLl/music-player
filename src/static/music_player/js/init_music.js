global_songs = [];

async function initMusic() {

    const response = await fetch("music/getSongs", options).then(response => response.json())
    console.log(response.songs);
    global_songs = response.songs;

    Amplitude.init({

        songs: global_songs,

        playlists: initPlaylist()

    });

}


async function initPlaylist_list() {
    options.body = "";
    const response = await fetch("music/getplaylistlist", options).then(response => response.json());
    response.forEach(playlist => {
        $("#aside-playlist-list").append(`<li class="playlist-name-btn  hover:text-mycolor-4 p-1" data-id=${playlist.id}> ${playlist.name} </li>`);


    });
    $(".playlist-name-btn").click((event) => {

        if ($("#playlist-page").hasClass("hidden")) {
            $("#home-page").toggleClass("hidden");
            $("#playlist-page").toggleClass("hidden");
        }
        updatePlaylistPage(event.target.dataset.id);
    });
}


async function initPlaylist() {
    options.body = ""
    const resposnse = await fetch("music/getplaylists", options).then(response => response.json());
    console.log(resposnse);
    return resposnse
}

initMusic();
initPlaylist_list();