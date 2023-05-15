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
    console.log(playlist_id);
    return;
}