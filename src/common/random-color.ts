import { Colors } from './constant/color.constant';

const palette = [
  Colors.amber.val,
  Colors.deeppink.val,
  Colors.deepsky.val,
  Colors.sky.val,
  Colors.chocolate.val,
  Colors.aqua.val,
  Colors.violet.val,
  Colors.neon.val,
  Colors.crimson.val,
  Colors.fuchisa.val,
  Colors.tomato.val,
  Colors.gold.val,
  Colors.orchid.val,
  Colors.pink.val,
  Colors.purple.val,
  Colors.teal.val,
];

export default function () {
  const id = Math.floor(Math.random() * palette.length);
  return palette[id];
}