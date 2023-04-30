function myalert(message) {
    $("#alert").toggleClass("translate-y-0");
    $("#alert").toggleClass("shadow-md");
    $("#alert").empty().append(`<span>${message}</span>`);


    setTimeout(() => {
        $("#alert").toggleClass("translate-y-0");
        $("#alert").toggleClass("shadow-md");

    }, 2000);
}