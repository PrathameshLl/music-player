global_songs = [];

async function initMusic() {

    const response = await fetch("music/getSongs", options).then(response => response.json());
    const playlist = await initPlaylist();
    global_songs = response.songs;
    let playist = {}
    Amplitude.init({

        songs: global_songs,

        playlists: playlist

    });


    global_songs.forEach((song, index) => {
        const element = `
                    <div class="py-3 border-b border-mycolor2-2 px-1 flex justify-center gap-4">
                        <img class="basis-[5%] shrink-0" src="${song.cover_art_url}">
                        <div class="basis-full">
                            <div> ${song.name} </div>
                            <div> ${song.artist} </div>
                        </div>
                        <div  >
                            <div class="amplitude-play-pause playlist-play-btn bg-mycolor-4 p-2 rounded-full" data-amplitude-song-index="${index}">
                                <svg id="playlist-specific-song-play-icon-${index+"g"}" data-id="${index+"g"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                                <svg id="playlist-specific-song-pause-icon-${index+"g"}" data-id="${index+"g"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>

                            </div>
                        </div>
                    </div>
                `;
        $("#global-song-list").append(element);
        Amplitude.bindNewElements();

        $(".playlist-play-btn").click((event) => {
            const playBtn = document.getElementById("play-btn");
            const pauseBtn = document.getElementById("pause-btn");
            togglePlayPause(playBtn, pauseBtn)
        });
    })
    Object.entries(playlist).forEach((p, index) => {
        description = ""
        if (p[1].description === "null")
            description = p[1].description;


        const [key, value] = p;
        content = `
        <div class="card">
    <div class="img-holder">
        <img src=${p[1].cover} alt="">
    </div>
    <div class="text playlist-name-btn" data-id=${p[0]}>
        <h2>${p[1].title}</h2>
        <p>${description}</p>
    </div>
    <div class="play-icon">
        <div class="circle">
            <div class="triangle"></div>
        </div>
    </div>
    </div>
    `
        $("#playlist-cards").append(content);
    });
    $(".playlist-name-btn").click((event) => {

        $("#home-page").addClass("hidden");
        $("#playlist-page").removeClass("hidden");
        $("#global-list-page").addClass("hidden");
        updatePlaylistPage(event.currentTarget.dataset.id);
    });

}


async function initPlaylist_list() {
    options.body = "";
    const response = await fetch("music/getplaylistlist", options).then(response => response.json());
    response.forEach(playlist => {
        $("#aside-playlist-list").append(`<li class="playlist-name-btn  hover:text-mycolor-4 p-1" data-id=${playlist.id}> ${playlist.name} </li>`);


    });
    $(".playlist-name-btn").click((event) => {

        $("#home-page").addClass("hidden");
        $("#playlist-page").removeClass("hidden");
        $("#global-list-page").addClass("hidden");
        updatePlaylistPage(event.target.dataset.id);
    });
}


$("#go-to-home").click((event) => {
    $("#home-page").removeClass("hidden");
    $("#playlist-page").addClass("hidden")
    $("#playlist-page").addClass("hidden")

})


async function initPlaylist() {
    options.body = ""
    const resposnse = await fetch("music/getplaylists", options).then(response => response.json());

    return resposnse
}

initMusic();
initPlaylist_list();