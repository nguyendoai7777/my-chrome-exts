import { CSSProperties } from 'react';
import { Color, Colors } from './color.constant';

export const InputStyle: CSSProperties = {
  backgroundColor: 'transparent',
  color: Colors.white.val,
};

export const InputClassName = /* tailwindcss */ `placeholder:text-gray-400 hover:border-inputHover focus:border-inputHover`;


