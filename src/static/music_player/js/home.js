const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function togglePlayPause(playBtn, pauseBtn) {
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
};

playBtn.addEventListener("click", (event) => {
    togglePlayPause(playBtn, pauseBtn);
});

pauseBtn.addEventListener("click", (event) => {
    togglePlayPause(playBtn, pauseBtn);
});

nextBtn.addEventListener("click", (event) => {
    if (!playBtn.classList.contains("hidden")) {
        togglePlayPause(playBtn, pauseBtn);
    }
});

prevBtn.addEventListener("click", (event) => {
    if (!playBtn.classList.contains("hidden")) {
        togglePlayPause(playBtn, pauseBtn);
    }
});


document.addEventListener("keyup", (event) => {
    if (event.keyCode == 32)
        togglePlayPause(playBtn, pauseBtn);
});


song_title = document.getElementById("song-title")
scrollWidth = song_title.scrollWidth


window.addEventListener("load", (event) => {
    let prevScroll = song_title.scrollLeft
    let scrollvalue = 1;
    self.setInterval(() => {
        if (song_title.scrollLeft !== scrollWidth) {
            song_title.scrollTo(song_title.scrollLeft + scrollvalue, 0);
            if (prevScroll === song_title.scrollLeft) scrollvalue = -scrollvalue;
            prevScroll = song_title.scrollLeft;
        }
    }, 40);
});

const mutebtn = document.getElementById("mute-btn")
const unmutebtn = document.getElementById("unmute-btn")


mutebtn.addEventListener("click", (event) => {
    togglePlayPause(mutebtn, unmutebtn);
});
unmutebtn.addEventListener("click", (event) => {
    togglePlayPause(mutebtn, unmutebtn);
});




/***********************************js relatied to add song **************************************** */

function getRatationAngle(degree) {
    let rotation = degree;

    function closure(add) {
        let rotation_at_point = rotation;
        rotation += add;
        return rotation_at_point;
    };
    return closure;
}

rotate = getRatationAngle(45);

const song_add_interface_btn = document.getElementById("toggle-add-song-btn");
song_add_interface_btn.addEventListener("click", (event) => {

    song_add_interface_btn.style.transform = `rotate(${rotate(45)}deg)`;

    if (!$("#song-confirmation").hasClass("opacity-0")) {
        $("#song-adding-img").attr("src", defaultAddImg);
        $("#song-adding-interface").toggleClass("opacity-0");
        $("#song-confirmation").toggleClass("opacity-0");
        $("#song-adding-interface").toggleClass("z-40");
        $("#song-adding-interface").toggleClass("z-10");
        return;
    };

    $("#song-adding-notice").toggleClass("opacity-100");
    $("#song-adding-interface").toggleClass("opacity-0");

    $("#song-adding-notice").toggleClass("z-50");
    $("#song-adding-notice").toggleClass("z-20");
    return;

});





async function handleSongAdd(event) {
    console.log("handlesongadd");

    var file_name = $("#song-file").val()
    if (file_name == "") {
        myalert("Music File is Missing ", "wrong");
        return;
    }
    if (file_name.split(".").pop() !== "mp3") {
        myalert("please put a music file");
        return;
    }
    file = document.getElementById("song-file").files[0];
    let response_song = await getSongDetails(event.currentTarget.dataset.id);

    song_details = {
        title: response_song.title,
        artist: response_song.artist_names,
        album_name: response_song.album.name,
        album_cover: response_song.album.cover_art_url,
        file: file
    }
    $("#song-adding-interface").toggleClass("opacity-0");
    $("#song-confirmation").toggleClass("opacity-0");

    $("#song-adding-interface").toggleClass("z-40");
    $("#song-adding-interface").toggleClass("z-10");


    $("#song-selection-title").empty().append(`<span class="text-mycolor-4" >${song_details.title}</span>`);
    $("#song-selection-artist").empty().append(`<span class="text-mycolor-4">${song_details.artist}</span>`);
    $("#song-selection-album").empty().append(`<span class="text-mycolor-4">${song_details.album_name}</span>`);
    $("#song-adding-img").attr("src", song_details.album_cover);
};

song_add_search = document.getElementById("song-add-search");
if (song_add_search) {
    /*
        <div 
            class="song_item flex gap-3 hover:bg-mycolor-4 p-2 text-xs rounded-md border-b border-mycolor2-2">
            <img src="/mediafiles/album_cover/Blindinglights.jpg"
            class="shrink-0 w-10 object-contain">
            <div class="">
                <span>Blinding Lights</span> <br>
                <span>The Weeknd </span>
            </div>
        </div>

    */
    let global_state = 0
    function handleAddSongSearch(event) {

        function getSearchSongRequest() {
            global_state += 1;
            let local_state = global_state;
            
            function onAddSearch() {
                setTimeout(() => {
                    if (local_state === global_state) {
                        searchSongs(event.target.value).then((songs) => {
                            $("#song-results").empty();
                            songs.forEach((song, i) => {
                                search_item = document.createElement("div");
                                $(search_item).addClass('flex song_add_item gap-3 hover:bg-mycolor-4 p-2 text-xs rounded-md border-b border-mycolor2-2')
                                $(search_item).attr("id", i);
                                $(search_item).click(handleSongAdd);
                                $(search_item).attr("data-title", `${song.title}`);
                                $(search_item).attr("data-artist", `${song.artist_names}`);
                                $(search_item).attr("data-album", `${song.album}`);
                                $(search_item).attr("data-id", `${song.id}`);
                                $(search_item).attr("data-album_cover", `${song.song_art_image_url}`);


                                $(search_item).append(`<img src=${song.song_art_image_url} class="shrink-0 w-10 object-contain">`)
                                $(search_item).append(
                                    `<div class="">
                                <span>${song.title}</span> <br>
                                <span>${song.artist_names}</span>
                                </div>`
                                );
                                $("#song-results").append(search_item);
                            });

                        });
                    }
                },500);

            };

            return onAddSearch
        }

        requestSong = getSearchSongRequest(); 
        requestSong();
        return;
    }
    song_add_search.addEventListener("input", handleAddSongSearch);
};






/******j********************************************************************************** */