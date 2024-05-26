import { useEffect, useState } from 'react';

import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { Color, Colors } from '../../../common/constant/color.constant';
import messenger from '../../../common/messenger';
import { SendAudioProfile } from '../../../common/types/audio-execution.type';

export const Popup = () => {
	const [fetching, setFetching] = useState(false);
	const [pageURL, setPageURLPermission] = useState({
		ZingMp3: true,
	});

	const fetchAudio = () => {
		setFetching(true);
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id! },
				args: [],
				func: function () {
					const audioList = document.querySelectorAll('audio');
					const refs = audioList.length > 0 ? Array.from(audioList) : [];
					const audio = refs.filter((c) => c.hasAttribute('src'))[0];
					chrome.runtime.sendMessage({
						type: 'FetchingMediaSource',
						src: audio.src,
						pageURL: location.href,
					});
				},
			});
		});
	};

	useEffect(() => {
		messenger.listener<SendAudioProfile>(async (request) => {
			if (request.type === 'SendAudioProfile') {
				const data = await (await fetch(request.sourceURL)).blob();
				const virtualURL = URL.createObjectURL(data);
				const a = document.createElement('a');
				a.setAttribute('download', request.filename);
				a.setAttribute('target', '_blank');
				a.href = virtualURL;
				a.click();
				URL.revokeObjectURL(virtualURL);
				a.remove();
				setFetching(false);
			}
		});
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			console.log('url: ', tabs[0].url);
			// setPageURLPermission((c) => ({ ...c, ZingMp3: tabs[0].url!.startsWith('https://zingmp3.vn/') }));
		});
	}, []);

	return (
		<ConfigProvider
			theme={{
				components: {
					Button: (() => {
						const swatcher = new Color('#61dafb');
						return {
							defaultHoverBg: swatcher.withOpacity(0.2),
							defaultActiveBg: swatcher.withOpacity(0.25),
							colorBorder: swatcher.withOpacity(0.85),
						};
					})(),
				},
			}}
		>
			<div className='py-4 rounded' style={{ backgroundColor: Colors.dracula.val }}>
				{pageURL.ZingMp3 ? (
					<>
						<div className='flex justify-between px-4 items-center py-2 download-item'>
							<div className='text-base'>
								<b>[Zing]</b> Donwload current song
							</div>
							<Button onClick={fetchAudio} disabled={fetching} type='default' className='bg-transparent' icon={fetching ? <LoadingOutlined /> : <DownloadOutlined />} />
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</ConfigProvider>
	);
};

export default Popup;
