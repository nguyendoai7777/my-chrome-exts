import { ShortcutProps, Time } from './NewTab.type';
import dayjs from 'dayjs';

export
const shortcuts: ShortcutProps[] = [
  {
    name: 'Facebook',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
    url: 'https://facebook.com',
  },
  {
    name: 'Youtube',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
    url: 'https://youtube.com',
  },
  {
    name: 'Telegram',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    url: 'https://web.telegram.org/a',
  },
  {
    name: 'Dịch',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png',
    url: 'https://translate.google.com/?hl=vi&sl=en&tl=vi&op=translate',
  },
];

export const DEFAULT_SEED: Time = {
  hour: '9',
  minute: '30'
};

export const findEndTime = (t?: Time, config: Time = DEFAULT_SEED) => {
  return t ? dayjs(`${t.hour}:${t.minute}`, 'HH:mm').add(+config.hour, 'hour').add(+config.minute, 'minute').format('HH:mm').toString() : '';
};