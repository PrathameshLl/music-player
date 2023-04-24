const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function togglePlayPause(playBtn,pauseBtn){
    playBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
};

playBtn.addEventListener("click",(event)=>{
    togglePlayPause(playBtn,pauseBtn);
});

pauseBtn.addEventListener("click",(event)=>{
    togglePlayPause(playBtn,pauseBtn);
});

nextBtn.addEventListener("click",(event)=>{
    if(!playBtn.classList.contains("hidden")){
        togglePlayPause(playBtn,pauseBtn);
    }
});

prevBtn.addEventListener("click",(event)=>{
    if(!playBtn.classList.contains("hidden")){
        togglePlayPause(playBtn,pauseBtn);
    }
});


document.addEventListener("keyup",(event)=>{
    if(event.keyCode == 32)
        togglePlayPause(playBtn,pauseBtn);
});


song_title = document.getElementById("song-title")
scrollWidth = song_title.scrollWidth

/*
window.addEventListener("load",(event)=>{
    let prevScroll = song_title.scrollLeft
    let scrollvalue = 1;
    self.setInterval(()=>{
        if(song_title.scrollLeft !== scrollWidth){
            song_title.scrollTo(song_title.scrollLeft + scrollvalue,0);
            if(prevScroll === song_title.scrollLeft) scrollvalue = -scrollvalue;
            prevScroll = song_title.scrollLeft;
        }
    },40);
})
*/