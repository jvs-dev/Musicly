const initSearch = document.getElementById("initSearch")
const initContinueBtn = document.getElementById("initContinueBtn")
const searchSection = document.getElementById("searchSection")
const searchBtn = document.getElementById("searchBtn")
const vizualizer = document.querySelector(".main__div--container")
const audioTag = document.getElementById("audioTag")
const musicPlayPause = document.getElementById("musicPlayPause")
const musicTime = document.getElementById("musicTime")
const musicLoader = document.querySelector(".musicLoader")
const musicDuration = document.getElementById("musicDuration")
const forwardMusic = document.getElementById("forwardMusic")
const backMusic = document.getElementById("backMusic")
const MusicName = document.getElementById("MusicName")
const ArtistName = document.getElementById("ArtistName")
const loadingSection = document.getElementById("loadingSection")
const spotfyLink = document.getElementById("spotfyLink")

function activeLoading() {
    loadingSection.style.display = "flex"
    setTimeout(() => {
        loadingSection.style.opacity = "0.9"
    }, 1);
}

function desactiveLoading() {
    loadingSection.style.opacity = "0"
    setTimeout(() => {
        loadingSection.style.display = "none"
    }, 200);
}

const numberOfTrack = 0

async function initApp(musicId) {
    const url = `https://spotify81.p.rapidapi.com/tracks?ids=${musicId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c25b38504amsh07c3b69988a18f8p1c1ba7jsn54720b39dbba',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.tracks[0]);
        MusicName.textContent = `${result.tracks[0].name}`
        ArtistName.textContent = `${result.tracks[0].album.artists[0].name}`
        musicLoader.style.display = "none"
        musicTime.style.display = "flex"
        vizualizer.style.backgroundImage = `url(${result.tracks[0].album.images[0].url})`
        audioTag.src = `${result.tracks[0].preview_url}`
        spotfyLink.href = `${result.tracks[0].external_urls.spotify}`
        musicPlayPause.onclick = () => {
            if (!audioTag.paused) {
                audioTag.pause()
                musicPlayPause.children[0].name = "play"
            } else {
                audioTag.play()
                musicPlayPause.children[0].name = "pause"
            }
        }
        forwardMusic.onclick = () => {
            audioTag.currentTime = audioTag.currentTime + 10
        }
        backMusic.onclick = () => {
            audioTag.currentTime = audioTag.currentTime - 10
        }
        setInterval(() => {
            if (audioTag.currentTime == audioTag.duration) {
                musicPlayPause.children[0].name = "play"
            }
            musicTime.textContent = `${`${Math.floor((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) / 60)}`.length == 1 ? `0${Math.floor((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) / 60)}` : `${Math.floor((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) / 60)}`}:${`${((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) % 60).toFixed(0)}`.length == 1 ? `0${((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) % 60).toFixed(0)}` : `${((audioTag.duration.toFixed(2) - audioTag.currentTime.toFixed(2)) % 60).toFixed(0)}`}`
            musicDuration.style.background = `linear-gradient(180deg, #FF5B50 0%, var(--black) ${((audioTag.currentTime / audioTag.duration) * 100).toFixed(2)}%)`
        }, 100);
        searchSection.style.display = "none"
        desactiveLoading()
    } catch (error) {
        console.error(error);
    }
}


initContinueBtn.addEventListener("click", () => {
    let url = `https://spotify81.p.rapidapi.com/search?q=${`${initSearch.value}`.replace(" ", "%20")}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c25b38504amsh07c3b69988a18f8p1c1ba7jsn54720b39dbba',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };

    async function searchTerm() {
        try {
            let response = await fetch(url, options);
            let result = await response.json();
            initApp(result.tracks[numberOfTrack].data.id)
        } catch (error) {
            console.error(error);
        }
    }
    activeLoading()
    searchTerm()
})

searchBtn.addEventListener("click", () => {
    searchSection.style.display = "flex"
    audioTag.pause()
    audioTag.currentTime = 0
    audioTag.src = ""
    musicTime.textContent = ""
    musicPlayPause.children[0].name = "play"
})

















