import { useEffect, useState } from 'react';

interface FallbackIconProps {
  name: string;
  bgc: string;
}

export default function ({ name, bgc }: FallbackIconProps) {
  const [shortName, setShortName] = useState('');
  useEffect(() => {
    const [n1, n2] = name.split(' ');
    setShortName(`${n1.at(0)}${n2 ? n2.at(0) : ''}`);
  }, [name]);
  return <div className="fallback-icon w-full h-full rounded-full flex items-center justify-center text-2xl font-bold uppercase" style={{ backgroundColor: bgc }}>{shortName}</div>;
}