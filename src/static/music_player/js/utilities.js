function myalert(message, sign) {

    let signs = {
        "failed": "text-mycolor-5",
        "success": "text-mycolor-4"
    };


    $("#alert").toggleClass("translate-y-0");
    $("#alert").toggleClass("shadow-md");
    $("#alert").empty().append(`<span class="${signs[sign]}">${message}</span>`);


    setTimeout(() => {
        $("#alert").toggleClass("translate-y-0");
        $("#alert").toggleClass("shadow-md");

    }, 2000);
};


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

};



const options = {
    method: 'POST',
    headers: {
        'X-CSRFToken': getCookie('csrftoken'),
    },
    mode: 'same-origin',
    body: "",
}



function updatePlaylistPage(playlist_id) {
    $("#playlist-songs").empty();

    payload = {
        "song_id": playlist_id
    };
    fetch("/music/getplaylist", {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            mode: 'same-origin',
            body: JSON.stringify(payload),
        }).then(response => response.json())
        .then(response => {
            $("#playlist-page-name").text(response.name);
            $("#playlist-image").attr("src", response.cover);
            $("#playlist-page-description").text(response.description);
            $("#playlist-add-song-result").data("id", response.id)
            $("#playlist-play-btn").attr("data-amplitude-playlist", response.id);
            response.songs.forEach((song, index) => {
                const element = `
                    <div class="py-3 border-b border-mycolor2-2 px-1 flex justify-center gap-4">
                        <img class="basis-[5%]" src="${song.cover}">
                        <div class="basis-full">
                            <div> ${song.name} </div>
                            <div> ${song.artist} </div>
                        </div>
                        <div  >
                            <div class="amplitude-play-pause playlist-play-btn bg-mycolor-4 p-2 rounded-full" data-amplitude-song-index="${index}" data-amplitude-playlist=${response.id}>
                                <svg id="playlist-specific-song-play-icon-${index}" data-id="${index}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                                <svg id="playlist-specific-song-pause-icon-${index}" data-id="${index}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hidden">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>

                            </div>
                        </div>
                    </div>
                `;
                $("#playlist-songs").append(element);
                Amplitude.bindNewElements();
            })

            $(".playlist-play-btn").click((event) => {
                ("hiiiii")
                const playBtn = document.getElementById("play-btn");
                const pauseBtn = document.getElementById("pause-btn");
                togglePlayPause(playBtn, pauseBtn);
                const playlistPlayBtn = document.getElementById("playlist-specific-song-play-icon-" + event.target.dataset.id);
                const playlistPauseBtn = document.getElementById("playlist-specific-song-pause-icon-" + event.target.dataset.id);
                if (playlistPauseBtn && playlistPauseBtn)
                    togglePlayPause(playlistPauseBtn, playlistPlayBtn);


                const main_playlist_play_icon = document.getElementById("playlist-main-play-icon");
                const main_playlist_pause_icon = document.getElementById("playlist-main-pause-icon");

                if (main_playlist_pause_icon && main_playlist_play_icon)
                    togglePlayPause(main_playlist_pause_icon, main_playlist_play_icon)
            });
        });


    return;
}

function togglePlayPause(playBtn, pauseBtn) {
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
};