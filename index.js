const fs = require('fs');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);

const convertVideo = (video) => {
	return new Promise((resolve, reject) => {
		ffmpeg(`./webms/${video}`)
			.output(`./mp4s/${video.slice(0, -5)}.mp4`)
			.on('error', (err) => {
				return reject(new Error(err));
			})
			.on('end', function () {
				console.log(`Finished processing: ${video}`);
				resolve();
			})
			.run();
	});
};

(async () => {
	let fileNames = fs.readdirSync('./webms');

	for (video of fileNames) {
		console.log(`Starting: ${video}`);
		await convertVideo(video);

		try {
			fs.unlinkSync(`./webms/${video}`);
			console.log(`${video} removed`);
		} catch (err) {
			console.error(err);
		}
	}
})();
