import YX1Eaphones from './YX1Eaphones';
import ZX7Speaker from './ZX7Speaker';
import ZX9Speaker from './ZX9Speaker';

export default function HighlightedProducts() {
  return (
    <section className='w-full px-4 flex flex-col space-y-12 md:px-0 md:max-w-mainContentTablet lg:max-w-mainContent'>
      <ZX9Speaker />
      <ZX7Speaker />
      <YX1Eaphones />
    </section>
  );
}
