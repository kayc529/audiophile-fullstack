import { separateParagraphs } from '../../utils/paragraphHelper';
interface Props {
  features: string | undefined;
}

export default function Features({ features }: Props) {
  return (
    <div className='w-full flex flex-col lg:w-[635px]'>
      <h3 className='pb-6 uppercase text-h5 leading-h5 tracking-h5 font-bold md:pb-8 md:text-h3 md:leading-h3 md:tracking-h3'>
        features
      </h3>
      {
        <div className='flex flex-col space-y-6 md:space-y-8'>
          {separateParagraphs(features).map((paragraph, index) => {
            return (
              <p
                key={index}
                className='text-left text-lg leading-lg tracking-lg md:text-justify lg:text-left'
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      }
    </div>
  );
}
