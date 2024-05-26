import { shortcuts } from '../NewTab.const';

export default function () {
  return <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 mt-4 xl:mt-6 gap-4 xl:gap-6">
    {shortcuts.map((c) => (
      <a href={c.url} className="shortcut" key={c.url} target="_self">
        <div className="max-w-[60px] w-[60px] aspect-square flex items-center overflow-hidden rounded">
          <img src={c.image} alt="" className="w-full"/>
        </div>
        <div className="text-sm name whitespace-nowrap max-w-full text-ellipsis overflow-hidden">{c.name}</div>
      </a>
    ))}
  </div>;
}