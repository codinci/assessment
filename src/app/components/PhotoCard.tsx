import Image from 'next/image';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoCard: React.FC<{ image: Photo }> = ({ image }) => {
  const myLoader=({src})=>{
    return `${image.url}`;
  }
  return (
    <div className="w-full sm:w-1/3 lg:w-1/5 p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
         <div className="p-4">
          <h3 className="text-lg font-semibold">{image.title}</h3>
        </div>

        <div className="relative h-48">
           <Image
              loader={myLoader}
            src={image.url}
             preload={false}
              className='w-full h-full object-cover'
              width={215}
              height={215}
              alt={image.title}
            />
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;