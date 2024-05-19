const { runtime } = chrome;

interface MessageType<X = any> {
	name: string;
	option?: X;
}

export default {
	listener<T>(callback: (props: T, sender: chrome.runtime.MessageSender) => void) {
		runtime.onMessage.addListener(callback);
	},
	send<T extends object, DataTransfer = MessageType<T>>(props: DataTransfer) {
		runtime.sendMessage(props);
	},
};
