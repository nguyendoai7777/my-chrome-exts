export interface ShortcutProps {
  name: string;
  image: string;
  localImage?: string;
  url: string;
  id?: string;
  bgc?: string;
}

export interface Time {
  hour: string;
  minute: string;
}

export interface CheckTime {
  current: string;
  time: Time;
}