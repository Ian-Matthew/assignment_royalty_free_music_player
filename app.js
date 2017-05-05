var model = {
    nowPlaying: "",
    isPaused: true,


};


var songSrcs = {

    springish: "music\\springish.mp3",
    gentleman: "music\\A-Gentleman.mp3",
    nightOwl: "music\\Night-Owl.mp3",
    curiousCase: "music\\Curious-Case.mp3"

};

var songButtons = $(".song-item-group");

var audio = $("<audio></audio>");

$("body").append(audio);


function PlayAudio() {
    audio.get(0).play();
}

function PauseAudio() {

    audio.get(0).pause();
}

songButtons.click(function() {

    var song = $(this).attr("id");

    if (song === model.nowPlaying) {
        playPausetoggle();
    } else {
        model.nowPlaying = song;
        audio.attr("src", songSrcs[song]);
        PlayAudio();
        model.isPaused = false;

    }

    function playPausetoggle() {

        if (model.isPaused) {
            PlayAudio();
            model.isPaused = false;
        } else {
            console.log("im playing")
            PauseAudio();
            model.isPaused = true;
        }
    }



});
