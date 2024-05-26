import jsmediatags from 'jsmediatags';
import messenger from '../common/messenger';
import { SendAudioProfile } from '../common/types/audio-execution.type';

chrome.runtime.onMessage.addListener(async (request) => {
	console.log('request: ', request);
	if (request.type === 'FetchingMediaSource') {
		const data = await (await fetch(request.src)).blob();
		jsmediatags.read(data, {
			onSuccess: function ({ tags: { title, artist } }) {
				messenger.send<SendAudioProfile>({
					type: 'SendAudioProfile',
					filename: title && artist ? `${artist} - ${title}` : 'audio',
					sourceURL: request.src,
				});
			},
		});
	}
	if (request.type === 'PushCurrentPageURL') {
		console.log('data: ', request);
	}
});
