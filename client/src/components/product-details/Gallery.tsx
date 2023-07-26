import { ProductPhoto } from '../../utils/interface';

interface Props {
  images: ProductPhoto[] | undefined;
}

export default function Gallery({ images }: Props) {
  if (!images) {
    return <></>;
  }

  return (
    <article className='w-full flex flex-col items-center space-y-5  md:flex-row md:space-y-0 md:space-x-[18px] lg:space-x-[30px]'>
      <div className='flex flex-col space-y-5 lg:space-y-8'>
        {/* Image 1 */}
        <picture>
          <source src={images[0].tablet} media='(max-width:967px)' />
          <source src={images[0].mobile} media='(max-width:767px)' />
          <img
            className='--reveal --fadeLeft rounded-lg object-cover '
            src={images[0].desktop}
            alt='first'
          />
        </picture>

        {/* Image 2 */}
        <picture>
          <source src={images[1].tablet} media='(max-width:967px)' />
          <source src={images[1].mobile} media='(max-width:767px)' />
          <img
            className='--reveal --fadeLeft rounded-lg object-cover '
            src={images[1].desktop}
            alt='second'
          />
        </picture>
      </div>

      {/* Image 3 */}
      <picture>
        <source src={images[2].tablet} media='(max-width:967px)' />
        <source src={images[2].mobile} media='(max-width:767px)' />
        <img
          className='--reveal --fadeRight --delay-animation-200 h-[368px] rounded-lg object-cover md:h-auto'
          src={images[2].desktop}
          alt='third'
        />
      </picture>
    </article>
  );
}
