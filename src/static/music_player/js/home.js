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
searchSongs("city of stars").then((songs) => {
    console.log(songs)
});
let isrotated = 45;
const song_add_interface_btn = document.getElementById("toggle-add-song-btn");
song_add_interface_btn.addEventListener("click", (event) => {
    const add_song_notice = document.getElementById("song-adding-notice");
    add_song_notice.classList.toggle("opacity-0")
    document.getElementById("song-adding-interface").classList.toggle("opacity-0")


    song_add_interface_btn.style.transform = `rotate(${isrotated}deg)`;
    isrotated += 45;
});


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
    song_add_search.addEventListener("input", (event) => {
        searchSongs(event.target.value).then((songs) => {
            searchSongs(event.target.value)
                .then((songs) => {
                    songs.forEach((song,i) => {
                        console.log(i)
                        search_item = document.createElement("div");
                        $(search_item).addClass('flex gap-3 hover:bg-mycolor-4 p-2 text-xs rounded-md border-b border-mycolor2-2')
                        $(search_item).attr("id",i);                        
                    });
                });


        })
    });
}
/******j********************************************************************************** */