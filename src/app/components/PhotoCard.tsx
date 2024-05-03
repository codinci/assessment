import Image from 'next/image';
import Link from 'next/link';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoCard: React.FC<{ image: Photo }> = ({ image }) => {

  return (
    <Link href={`/photos/${image.id}`}>
      <div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
           <div className="p-4">
            <h3 className="text-lg font-semibold">{image.title}</h3>
          </div>
          <div className="relative h-48">
             <Image
                src='/image.jpg'
                className='w-full h-full object-cover'
                width={215}
                height={215}
                alt={image.title}
              />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;