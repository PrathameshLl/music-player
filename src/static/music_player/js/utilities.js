function myalert(message,sign) {

    let signs = {
        "wrong": "text-mycolor-5",
        "right": "text-mycolor-4"
    };


    $("#alert").toggleClass("translate-y-0");
    $("#alert").toggleClass("shadow-md");
    $("#alert").empty().append(`<span class="${signs[sign]}">${message}</span>`);


    setTimeout(() => {
        $("#alert").toggleClass("translate-y-0");
        $("#alert").toggleClass("shadow-md");

    }, 2000);
}