import { ChromeRuntimeSendEvent } from './chrome-event';

export interface SendAudioProfile extends ChromeRuntimeSendEvent {
	filename: string;
	sourceURL: string;
}
