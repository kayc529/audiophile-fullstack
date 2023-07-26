const VISIBLE_DISTANCE = 200;
const OPACITY_CONSTANT = 0.9;
const ZX9_OFFSET = 50;
const ZX7_OFFSET = 650;
const YX1_OFFSET = 1100;
const ZX9_CHECKPOINT = 1000;
const ZX7_CHECKPOINT = 1800;
const YX1_CHECKPOINT_1 = 2000;
const YX1_CHECKPOINT_2 = 2100;

export const setAnimations = () => {
  revealAnimatedElements();
  setScrollOpacity();
  // setScrollPercentage();
};

export const revealAnimatedElements = () => {
  let elementsToReveal = document.querySelectorAll('.--reveal');

  for (let i = 0; i < elementsToReveal.length; i++) {
    let windowHeight = window.innerHeight;
    var elementTop = elementsToReveal[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - VISIBLE_DISTANCE) {
      elementsToReveal[i].classList.add('active');
    } else {
      elementsToReveal[i].classList.remove('active');
    }
  }
};

export const setScrollOpacity = () => {
  const currentScroll = window.pageYOffset;

  let zx9Opacity = 0 + (currentScroll / ZX9_CHECKPOINT) * OPACITY_CONSTANT;
  let zx7Opacity = 0 + (currentScroll / ZX7_CHECKPOINT) * OPACITY_CONSTANT;
  let yx1Opacity1 = 0 + (currentScroll / YX1_CHECKPOINT_1) * OPACITY_CONSTANT;
  let yx1Opacity2 = 0 + (currentScroll / YX1_CHECKPOINT_2) * OPACITY_CONSTANT;

  document.body.style.setProperty('--scroll-zx9speaker', zx9Opacity.toString());
  document.body.style.setProperty('--scroll-zx7speaker', zx7Opacity.toString());
  document.body.style.setProperty(
    '--scroll-yx1earphones-1',
    yx1Opacity1.toString()
  );
  document.body.style.setProperty(
    '--scroll-yx1earphones-2',
    yx1Opacity2.toString()
  );
};

export const setScrollPercentage = () => {
  /*
    window.pageYOffset -> how many pixels have been scrolled Y
    document.body.offsetHeight -> height of body content
    window.innerHeight -> height of viewport
  */

  //the --scroll variable indicates how much (in%) of the scrollable content
  //has been scrolled
  document.body.style.setProperty(
    '--scroll',
    (
      window.pageYOffset /
      (document.body.offsetHeight - window.innerHeight)
    ).toString()
  );

  let zx9speakerDelay = 0;
  let zx7speakerDelay = 0;
  let yx1earphonesDelay = 0;

  if (window.pageYOffset > ZX9_OFFSET) {
    zx9speakerDelay = 1;
  }
  if (window.pageYOffset > ZX7_OFFSET) {
    zx7speakerDelay = 1;
  }
  if (window.pageYOffset > YX1_OFFSET) {
    yx1earphonesDelay = 1;
  }

  document.body.style.setProperty(
    '--scroll-zx9speaker',
    zx9speakerDelay.toString()
  );
  document.body.style.setProperty(
    '--scroll-zx7speaker',
    zx7speakerDelay.toString()
  );
  document.body.style.setProperty(
    '--scroll-yx1earphones',
    yx1earphonesDelay.toString()
  );
};
