//Model -- things to keep track of.
var model = {
    nowPlaying: "",
    lastPlayed: "",
    isPaused: true,
    songs: [{
            id: 0,
            title: "Springish",
            artist: "Gillicuddy",
            src: "music\\springish.mp3"
        },
        {
            id: 1,
            title: "A Gentleman",
            artist: "Podington Bear",
            src: "music\\A-Gentleman.mp3"
        },
        {
            id: 2,
            title: "Night Owl",
            artist: "Broke For Free",
            src: "music\\Night-Owl.mp3"
        },
        {
            id: 3,
            title: "Curious Case",
            artist: "Blue Dot",
            src: "music\\Curious-Case.mp3"
        }
    ]
};

//Grab constants from DOM
const songButtons = $(".song-item-group");
const audio = $("#song");

//Music Player Actions/Controls
function PlayAudio() {
    audio.get(0).play();
}

function PauseAudio() {
    audio.get(0).pause();
}

function playPausetoggle() {
    if (model.isPaused) {
        PlayAudio();
        model.isPaused = false;
    } else {
        PauseAudio();
        model.isPaused = true;
    }
}

// Button Event Handlers
songButtons.click(function() {
    var selectedSongId = $(this).attr("id");
    var selectedSong = model.songs[selectedSongId];

    //Pauses and Plays selected song
    if (selectedSong === model.nowPlaying) {
        playPausetoggle();
        render();

    } else {
        //If selected song Changes, update model, play, and render.
        model.lastPlayed = model.nowPlaying;
        model.nowPlaying = selectedSong;
        audio.attr("src", selectedSong.src);
        model.isPaused = false;
        render();
        PlayAudio();
    }
});


//Event Handlers for Control panel

var nextButton = $("#next");
var previousButton = $("#previous");
var playPauseButton = $("#play-pause");
var listLen = model.songs.length;

//  Next Button
nextButton.click(function() {
    var currentIdx = model.nowPlaying.id;
    var newIdx = clamp(currentIdx + 1, listLen - 1);
    model.nowPlaying = model.songs[newIdx];
    model.lastPlayed = model.songs[currentIdx];
    audio.attr("src", model.nowPlaying.src);
    model.isPaused = false;
    render();
    PlayAudio();
});

//  Previous Button
previousButton.click(function() {
    var currentIdx = model.nowPlaying.id;
    var newIdx = clamp(currentIdx - 1, listLen - 1);
    model.nowPlaying = model.songs[newIdx];
    model.lastPlayed = model.songs[currentIdx];
    audio.attr("src", model.nowPlaying.src);
    model.isPaused = false;
    render();
    PlayAudio();
});

//  Play / Pause button
playPauseButton.click(function() {
    if (model.nowPlaying === "") {
        model.nowPlaying = model.songs[0];
        audio.attr("src", model.nowPlaying.src);
        $("#" + model.nowPlaying.id).toggleClass("active");
    }
    playPausetoggle();
    render();
});

// Render Function
function render() {

    //Load Now playing status in Header
    var nowPlayingelem = $("#now-playing");
    nowPlayingelem.text(model.nowPlaying.title + " " + model.nowPlaying.artist);

    //Change Active status on elements

    //Toggle Active Status on last played song
    if (model.lastPlayed !== model.nowPlaying) {
        $("#" + model.lastPlayed.id)
            .removeClass("active")
            .find(".play-button")
            .removeClass("fa-play fa-pause")
            .addClass("fa-play");
    }

    //Toggle active status on current song
    var activeElem = $("#" + model.nowPlaying.id);
    if (!activeElem.hasClass("active")) {
        $("#" + model.nowPlaying.id)
            .addClass("active");
    }

    //Grab active song icon and play button
    var activeIcon = activeElem.find(".play-button");
    var footerButton = $("#play-pause");

    //Render as pause
    if (!model.isPaused) {
        activeIcon
            .removeClass("fa-play")
            .addClass("fa-pause");
        footerButton.text("pause");
    }
    //Render as play
    else {
        activeIcon
            .removeClass("fa-pause")
            .addClass("fa-play");
        footerButton.text("play");
    }
}

// Helper Functions

function clamp(num, max) {
    if (num < 0) {
        return 0;
    }
    if (num >= max) {
        return max;
    }
    return num;
}
