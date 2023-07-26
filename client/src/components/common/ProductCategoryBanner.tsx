interface Props {
  name: string;
}

export default function ProductCategoryBanner({ name }: Props) {
  return (
    <div className='w-full h-[102px] bg-backgroundBlack flex justify-center items-center md:h-[239px]'>
      <p className='uppercase text-white text-h4 leading-h4 tracking-h4 md:text-h2 md:leading-h2 md:tracking-h2'>
        {name}
      </p>
    </div>
  );
}
