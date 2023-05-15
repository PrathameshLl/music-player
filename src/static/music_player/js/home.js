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

function setCardOrder(card) {
    return;
}

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


const formdata = new FormData();
async function handleSongAdd(event) {
    console.log("handlesongadd");

    var file_name = $("#song-file").val()
    if (file_name == "") {
        myalert("Music File is Missing ", "failed");
        return;
    }
    if (file_name.split(".").pop() !== "mp3") {
        myalert("please put a music file", "failed");
        return;
    }


    $("#song-adding-interface").toggleClass("opacity-0");
    $("#song-confirmation").toggleClass("opacity-0");

    $("#song-adding-interface").toggleClass("z-40");
    $("#song-adding-interface").toggleClass("z-10");



    file = document.getElementById("song-file").files[0];
    let response_song = await getSongDetails(event.currentTarget.dataset.id);

    song_details = {
        title: response_song.title,
        artist: response_song.artist_names,
        album_name: response_song.album.name,
        album_cover: response_song.album.cover_art_url,
        release_date: response_song.album.release_date_for_display,
        file: file
    };

    formdata.append("file", file);
    formdata.append("title", song_details.title);
    formdata.append("artist_name", song_details.artist);
    formdata.append("album_name", song_details.album_name);
    formdata.append("album_cover", song_details.album_cover);
    formdata.append("release_date", song_details.release_date);


    $("#song-selection-title").empty().append(`<span class="text-mycolor-4" >${song_details.title}</span>`);
    $("#song-selection-artist").empty().append(`<span class="text-mycolor-4">${song_details.artist}</span>`);
    $("#song-selection-album").empty().append(`<span class="text-mycolor-4">${song_details.album_name}</span>`);
    $("#song-adding-img").attr("src", song_details.album_cover);
    options.body = formdata;
    return;
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
                }, 500);

            };

            return onAddSearch
        }

        requestSong = getSearchSongRequest();
        requestSong();
        return;
    }
    song_add_search.addEventListener("input", handleAddSongSearch);

};



const upload_btn = document.getElementById("upload-song-btn");

upload_btn.addEventListener(("click"), (event) => {



    fetch("/music/upload", options).then((response) => {
        return response.json();
    }).then(response => {
        console.log(response);
        myalert(response.message, response.status)
        $("#song-adding-interface").toggleClass("z-10");
        $("#song-adding-interface").toggleClass("z-40");
        $("#song-adding-notice").toggleClass("z-20");
        $("#song-adding-notice").toggleClass("z-50");
        $("#song-confirmation").toggleClass("opacity-0");
        $("#song-adding-notice").toggleClass("opacity-100");
        $("#song-adding-img").attr("src", defaultAddImg);
        song_add_interface_btn.style.transform = `rotate(${rotate(45)}deg)`;
        file = document.getElementById("song-file").value = "";

        console.log(response.song)
        if (response.song)
            Amplitude.addSong(response.song)
    });
});

/******j********************************************************************************** */


/*******releated to playlist ***** */

$("#create-playlist-btn").click((event) => {
    $("#add-playlist-input").toggleClass("translate-x-0");
    $("#add-playlist-input").toggleClass("opacity-100");
    $("#cancel-playlist-input").toggleClass("hidden");
});

$("#cancel-playlist-input").click((event) => {
    $("#add-playlist-input").toggleClass("translate-x-0");
    $("#add-playlist-input").toggleClass("opacity-100");
    $("#cancel-playlist-input").toggleClass("hidden");
    $("#playlist-name").val("");
});


$("#playlist-post").click(function () {
    const playlist_name = $("#playlist-name").val();
    if (playlist_name.length === 0) {
        myalert("please add playlist name", "failed");
        return;
    }

    const new_options = {
        method: 'POST',
        headers: {
            'content-type': "application/json",
            'X-CSRFToken': getCookie('csrftoken'),
        },
        mode: 'same-origin',
        body: "",
    }
    new_options.body = JSON.stringify({
        "name": playlist_name
    });

    fetch("/music/createplaylist", new_options).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        myalert(response.message, response.status);
        $("#add-playlist-input").toggleClass("translate-x-0");
        $("#add-playlist-input").toggleClass("opacity-100");
        $("#cancel-playlist-input").toggleClass("hidden");
        $("#aside-playlist-list").append(`<li class="playlist-name-btn hover:text-mycolor-4 p-1" data-id=${response.playlist_id}> ${response.playlist_name} </li>`);
        $("#playlist-name").val("");



        $(".playlist-name-btn").click((event) => {

            if ($("#playlist-page").hasClass("hidden")) {
                $("#home-page").toggleClass("hidden");
                $("#playlist-page").toggleClass("hidden");
            }
            updatePlaylistPage(event.target.dataset.id);
        })
        return;
    });
});

document.querySelector("#add-playlist-song-input").addEventListener("input", (event) => {
    $("#playlist-add-song-result").empty();
    if (event.target.value.length === 0) {
        return;
    };

    const search_query = JSON.stringify({
        "song_name": event.target.value
    });
    fetch("music/searchsongs", {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                'X-CSRFToken': getCookie('csrftoken'),
            },
            mode: 'same-origin',
            body: search_query,
        })
        .then(response => response.json())
        .then(response => {
            response.forEach(song => {
                $("#playlist-add-song-result").append(`<li class="playlist-add-song-item px-1 py-1 hover:bg-mycolor-4" data-id=${song.id} > ${song.name} by ${song.artist} </li>`);
            });

            $(".playlist-add-song-item").click(async function (event) {
                $("#playlist-add-song-result").empty();
                const playlist_id = $("#playlist-add-song-result").data("id");
                console.log(event.target.dataset);
                payload = {
                    "song_id": event.target.dataset.id,
                    "playlist_id": playlist_id,
                }
                fetch("/music/addsongtoplaylist", {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                        mode: 'same-origin',
                        body: JSON.stringify(payload),
                    }).then(response => response.json())
                    .then(response => {

                        myalert("song added in playlist");
                        location.reload();
                    })
            });
        });
});

/************ */