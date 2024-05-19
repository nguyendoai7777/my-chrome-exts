import { shortcuts } from '../NewTab.const';
import React from 'react';

export default function () {
  return <div className="grid grid-cols-10 mt-6 gap-6">
    {shortcuts.map((c) => (
      <a href={c.url} className="shortcut" key={c.url} target="_blank">
        <div className="max-w-[60px] w-[60px] aspect-square flex items-center overflow-hidden rounded">
          <img src={c.image} alt="" className="w-full"/>
        </div>
        <div className="text-sm name whitespace-nowrap max-w-full text-ellipsis overflow-hidden">{c.name}</div>
      </a>
    ))}
  </div>;
}