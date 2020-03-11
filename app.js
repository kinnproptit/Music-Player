const trackData = [
	{
		id: 1,
		name: "Anh thanh niên",
		path: "videos/Anh_Thanh_Nien.mp3",
		artist: "HuyR",
		duration: "03:51"
	},
	{
		id: 2,
		name: "OK",
		path: "videos/Ok.mp3",
		artist: "Binz",
		duration: "02:34"
	},
	{
		id: 3,
		name: "Bánh Mì Không",
		path: "videos/Banh_Mi_Khong.mp3",
		artist: "Đạt G Ft Du Uyên",
		duration: "04:05"
	},
	{
		id: 4,
		name: "Let's Leave",
		artist: "Epitone Project",
		path: "videos/Let_s Leave.mp3",
		duration: "05:03"
	},
	{
		id: 5,
		name: "A Little Braver",
		artist: "The New Empire",
		path: "videos/A_Little_Braver.mp3",
		duration: "03:27"
	},
	{
		id: 6,
		name: "3 AM",
		artist: "Finding Hope",
		path: "videos/3AM.mp3",
		duration: "03:22"
	},
	{
		id: 7,
		name: "Infinity",
		artist: "KHS Ft The Overtunes",
		path: "videos/Infinity.mp3",
		duration: "03:27"
	},
	{
		id: 8,
		name: "Don't Deserve You",
		artist: "Plumb",
		path: "videos/Don_t_Deserve_You.mp3",
		duration: "04:12"
	}
];

const timeStart = document.querySelector(".playerCard__playbar--timer--start"),
	timeEnd = document.querySelector(".playerCard__playbar--timer--end"),
	songName = document.querySelector(".playerCard__description--song-name"),
	artistName = document.querySelector(".playerCard__description--artist"),
	trackList = document.querySelector(".playlist"),
	playBtn = document.querySelector("#play"),
	prevBtn = document.querySelector("#prev"),
	nextBtn = document.querySelector("#next"),
	progress = document.querySelector(".playerCard__progress"),
	progressBar = document.querySelector(".progress-bar"),
	trackDescriptionName = document.querySelector(
		".playlist__item__description--line-1"
	),
	trackDescriptionDuration = document.querySelector(
		".playlist__item__duration"
	),
	audio = document.querySelector("#audio");

const buildPlaylist = () => {
	trackList.innerHTML = "";
	trackData.map(data => {
		const { name, artist, id, duration } = data;

		const track = `
					<div class="playlist__item" trackID = ${id}>
					<div class="playlist__item__icon">
						<div class="playlist__item__icon--1"></div>
						<div class="playlist__item__icon--2"></div>
					</div>
					<div class="playlist__item__description">
						<div class="playlist__item__description--line-1">
							${name}
						</div>
						<div class="playlist__item__description--line-2">
							<span> ${artist} -  </span>
							<span>Album</span>
						</div>
					</div>
	
					<div class = "playing">
					</div>
					<div class="playlist__item__duration">${duration}</div>
				</div>
					`;
		trackList.innerHTML += track;
	});
};

buildPlaylist(trackData);

const trackListItem = document.querySelectorAll(".playlist__item");

// Keep track of song

let songIndex = 0;

// Update song
function loadSong(song) {
	const { id, name, artist, path, duration } = song;
	timeEnd.innerHTML = duration;
	artistName.innerHTML = artist;
	songName.innerHTML = name;
	audio.src = path;
	trackListItem.forEach(track => {
		const index = trackData.findIndex(
			item => item.id == track.getAttribute("trackid")
		);
		if (index === songIndex) {
			track.classList.add("active");
		} else {
			track.classList.remove("active");
		}
	});

	playSong();
}

function playSong() {
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");
	audio.play();
}

function pauseSong() {
	playBtn.querySelector("i.fas").classList.add("fa-play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");

	audio.pause();
}

// Update Progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	const timeNow = Math.floor(currentTime);
	timeStart.innerHTML = formatTime(timeNow);
	progressBar.style.width = `${progressPercent}%`;
}

// Set progress bar

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;

	updateProgress();
}

const parseTrackInfor = id => {
	const { name, artist } =
		(trackData && trackData.filter(track => track.id == id)[0]) ||
		trackData[0];
	songName.innerHTML = name;
	artistName.innerHTML = artist;
};

const formatPattern = pat => {
	const Strpat = pat + "";
	if (Strpat.length < 2) return `0${Strpat}`;
	return Strpat;
};

const formatTime = time => {
	const roundTime = Math.round(time);
	const hour = Math.floor(roundTime / 3600);
	const min = Math.floor((roundTime - hour * 3600) / 60);
	const sec = roundTime - hour * 3600 - min * 60;
	const ans = `${hour >= 1 ? hour + ":" : ""}${formatPattern(
		min
	)}:${formatPattern(sec)}`;
	return ans;
};

playBtn.addEventListener("click", () => {
	const isPlaying = playBtn
		.querySelector("i.fas")
		.classList.contains("fa-play");

	if (!isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Previous song

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex += trackData.length;
	}

	loadSong(trackData[songIndex]);
}

// Next song

function nextSong() {
	songIndex += 1;
	songIndex %= trackData.length;
	loadSong(trackData[songIndex]);
}

// Change song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

loadSong(trackData[songIndex]);

trackListItem.forEach(track => {
	track.addEventListener("click", () => {
		trackListItem.forEach(item => item.classList.remove("active"));

		const index = trackData.findIndex(
			item => item.id == track.getAttribute("trackid")
		);

		track.classList.add("active");
		songIndex = index || 0;
		loadSong(trackData[songIndex]);
	});
});
