import bracelet1 from './assets/images/bracelet 1.jpg';
import bracelet2 from './assets/images/bracelet 2.jpg';
import bracelet3 from './assets/images/bracelet 3.jpg';
import bracelet4 from './assets/images/bracelet 4.jpg';
import bracelet5 from './assets/images/bracelet 5.jpg';
import bracelet6 from './assets/images/bracelet 6.jpg';
import bracelet7 from './assets/images/bracelet 7.jpg';
import bracelet8 from './assets/images/bracelet 8.jpg';
import bracelet9 from './assets/images/bracelet 9.jpg';
import bracelet10 from './assets/images/bracelet 10.jpg';
import bracelet11 from './assets/images/bracelet 11.jpg';
import bracelet12 from './assets/images/bracelet 12.jpg';
import bracelet13 from './assets/images/bracelet 13.jpg';
import pyramid1 from './assets/images/pyramid 1.jpg';
import pyramid2 from './assets/images/pyramid 2.jpg';
import pencil1 from './assets/images/pencile 1.jpg';

// Explicitly compile a dictionary matching database image_name fields
const images = {
  'bracelet 1.jpg': bracelet1,
  'bracelet 2.jpg': bracelet2,
  'bracelet 3.jpg': bracelet3,
  'bracelet 4.jpg': bracelet4,
  'bracelet 5.jpg': bracelet5,
  'bracelet 6.jpg': bracelet6,
  'bracelet 7.jpg': bracelet7,
  'bracelet 8.jpg': bracelet8,
  'bracelet 9.jpg': bracelet9,
  'bracelet 10.jpg': bracelet10,
  'bracelet 11.jpg': bracelet11,
  'bracelet 12.jpg': bracelet12,
  'bracelet 13.jpg': bracelet13,
  'pyramid 1.jpg': pyramid1,
  'pyramid 2.jpg': pyramid2,
  'pencile 1.jpg': pencil1
};

export const getProductImage = (imageName) => {
  if (!imageName) return pyramid1;
  const name = imageName.toString().trim().toLowerCase();
  
  // Normalized keys check
  if (name.includes('bracelet 1.')) return bracelet1;
  if (name.includes('bracelet 2.')) return bracelet2;
  if (name.includes('bracelet 3.')) return bracelet3;
  if (name.includes('bracelet 4.')) return bracelet4;
  if (name.includes('bracelet 5.')) return bracelet5;
  if (name.includes('bracelet 6.')) return bracelet6;
  if (name.includes('bracelet 7.')) return bracelet7;
  if (name.includes('bracelet 8.')) return bracelet8;
  if (name.includes('bracelet 9.')) return bracelet9;
  if (name.includes('bracelet 10.')) return bracelet10;
  if (name.includes('bracelet 11.')) return bracelet11;
  if (name.includes('bracelet 12.')) return bracelet12;
  if (name.includes('bracelet 13.')) return bracelet13;
  if (name.includes('pyramid 1.')) return pyramid1;
  if (name.includes('pyramid 2.')) return pyramid2;
  if (name.includes('pencile 1.')) return pencil1;
  
  return images[imageName] || pyramid1;
};
