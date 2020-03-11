async function loadTrack(id, trackData) {
	const { path } =
		(trackData && trackData.filter(track => track.id == id)[0]) ||
		"../videos/Anh Thanh Nien.mp3";
	console.log(trackData, id, path);
	audio.load();
	audio.src = path || "../videos/Anh Thanh Nien.mp3";
	audio.addEventListener("loadedmetadata", () => {});
}
