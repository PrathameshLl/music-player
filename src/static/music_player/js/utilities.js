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
    console.log(playlist_id);

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
            console.log(response)
            $("#playlist-page-name").text(response.name);
            $("#playlist-image").attr("src", response.cover);
            $("#playlist-page-description").text(response.description);
            $("#playlist-add-song-result").data("id", response.id)

            response.songs.forEach((song) => {
                const element = `
                    <div class="py-3 border-b border-mycolor2-2 px-1 flex gap-4">
                        <img class="basis-[8%]" src="${song.cover}">
                        <div class="basis-full">
                            <div> ${song.name} </div>
                            <div> ${song.artist} </div>
                        </div>
                        <div>
                            <span class="amplitude-play" data-amplitude-song-index=${song.id} data-amplitude-playlist=${response.id}>press me</span>
                        </div>
                    </div>
                `;
                $("#playlist-songs").append(element)
            })

        });


    return;
}