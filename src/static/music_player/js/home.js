const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");

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

