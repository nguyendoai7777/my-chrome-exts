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
    name: 'Netflix',
    image: 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico',
    url: 'https://www.netflix.com/browse',
  },
  {
    name: 'Soundcloud',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Antu_soundcloud.svg',
    url: 'https://soundcloud.com/discover',
  },
  {
    name: 'Dịch',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png',
    url: 'https://www.google.com/search?q=dich&oq=dich&aqs=chrome..69i57j69i60.1998j0j4&sourceid=chrome&ie=UTF-8',
  },
];

export const DEFAULT_SEED: Time = {
  hour: '9',
  minute: '30'
};

export const findEndTime = (t?: Time, config: Time = DEFAULT_SEED) => {
  return t ? dayjs(`${t.hour}:${t.minute}`, 'HH:mm').add(+config.hour, 'hour').add(+config.minute, 'minute').format('HH:mm').toString() : '';
};