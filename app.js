//Model -- things to keep track of.
var model = {
    nowPlaying: "",
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

//Grab needed elements from DOM
var songButtons = $(".song-item-group");
var audio = $("<audio></audio>");
$("body").append(audio);

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
        renderIcons();

    } else {
        //If selected song Changes, new Song plays
        model.nowPlaying = selectedSong;
        audio.attr("src", selectedSong.src);
        model.isPaused = false;
        renderIcons();
        PlayAudio();
    }
});

//Event Handlers for Control panel
var nextButton = $("#next");
var previousButton = $("#previous");
var playPauseButton = $("#play-pause");
var listLen = model.songs.length;

//Next Button
nextButton.click(function() {
    var currentIdx = model.nowPlaying.id;
    var newIdx = clamp(currentIdx + 1, listLen - 1);
    model.nowPlaying = model.songs[newIdx];
    audio.attr("src", model.nowPlaying.src);
    model.isPaused = false;
    renderIcons();
    PlayAudio();
});

//Previous Button
previousButton.click(function() {
    var currentIdx = model.nowPlaying.id;
    var newIdx = clamp(currentIdx - 1, listLen - 1);
    model.nowPlaying = model.songs[newIdx];
    audio.attr("src", model.nowPlaying.src);
    model.isPaused = false;
    renderIcons();
    PlayAudio();
});

// Play / Pause button

playPauseButton.click(function() {
    playPausetoggle();
    renderIcons();
})

function clamp(num, max) {
    if (num < 0) {
        return 0;
    }
    if (num >= max) {
        return max;
    }
    return num;
}

function renderIcons() {

    //render all Icons as play buttons
    var icons = $(".play-button");

    var footerButton = $("#play-pause");

    icons
        .removeClass("fa-play fa-pause")
        .addClass("fa-play");

    footerButton.text("play");

    //Select active-Icon and render it as play or pause depending on state
    var activeIcon = icons.filter(function(index) {
        return index == model.nowPlaying.id;
    });

    if (!model.isPaused) {
        activeIcon
            .addClass("fa-pause");
        footerButton.text("pause");
    }


}
