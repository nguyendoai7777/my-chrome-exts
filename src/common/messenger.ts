const { runtime } = chrome;

interface MessageType<X = any> {
	name: string;
	option?: X;
}

export default {
	listener<T>(callback: (props: T, sender: chrome.runtime.MessageSender) => void) {
		runtime.onMessage.addListener(callback);
	},
	send<T extends object>(props: T) {
		runtime.sendMessage(props);
	},
};
