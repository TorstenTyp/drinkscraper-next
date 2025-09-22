import Image from 'next/image';
import { Cocktail } from '@/app/lib/definitions';

export default function Card({ cocktail }: { cocktail: Cocktail }) {
  return (
    <a className="w-[45vw] h-[35vh] flex bg-white rounded-lg shadow-xl overflow-hidden p-[0.5vw] m-[1vw]"
      target="_blank" rel="noopener noreferrer"
      href={cocktail.Link} >
      <div className="w-1/3 bg-blue-100 p-[1.5vw] relative items-center m-[0.5vw] rounded-md">
        <div className="text-center">
          <Image
            src={cocktail.Image}
            alt='Cocktail'
            fill
            className='rounded object-cover'
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="h-1/5 p-[1vw] flex items-center justify-left border-b border-gray-200">
          <div className="">
            <h1 className="font-semibold" style={{ fontSize: '1.7vw' }}>{cocktail.Name}</h1>
          </div>
        </div>
        <div className="h-3/5 p-[1vw] flex items-center justify-left border-b border-gray-200">
          <div className="">
            <h3 style={{ fontSize: '1.2vw' }}>{cocktail.Ingredients}</h3>
          </div>
        </div>
        <div className="h-1/5 p-[1vw]">
          <div className="text-right">
            <p style={{ fontSize: '1vw' }}>{cocktail.Source}</p>
          </div>
        </div>
      </div>
    </a>
  );
}