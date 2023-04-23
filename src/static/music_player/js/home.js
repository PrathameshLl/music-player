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