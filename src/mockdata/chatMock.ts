import { Product } from '../types';

export const mockGenerateAIResponse = (query: string): string => {
  return `I found some excellent ${query} options for you. Here are the top matches based on reviews and specifications.`;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Sony WH-1000XM4',
    description: 'Industry leading active noise cancelling with premium sound quality and 30-hour battery life.',
    price: '$248.00',
    image: 'https://placeholder.com/150',
    url: '#',
    source: 'amazon.com'
  },
  {
    id: 'p2',
    title: 'Bose QuietComfort 45',
    description: 'Iconic quiet. Comfort. And sound. The first noise cancelling headphones are back.',
    price: '$279.00',
    image: 'https://placeholder.com/150',
    url: '#',
    source: 'bestbuy.com'
  },
  {
    id: 'p3',
    title: 'Sennheiser Momentum 4',
    description: 'Maximum battery life and exceptional sound signature.',
    price: '$299.00',
    image: 'https://placeholder.com/150',
    url: '#',
    source: 'sennheiser.com'
  }
];

export const MOCK_PREVIEW_PRODUCT = {
  title: 'Sony WH-1000XM4',
  price: '$248.00',
  source: 'Amazon',
  descriptionHtml: `
    <p>Industry-leading noise cancellation with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.</p>
    <p>Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls.</p>
  `
};
