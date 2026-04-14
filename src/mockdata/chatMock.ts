import { Product } from '../types';
export const mockGenerateAIResponse = (query: string): string => {
  return `Based on your request for "${query}", I've analyzed available inventory across our indexed retailers. 

I found several high-performance options that match your criteria. The **Sony WH-1000XM4** remains a top recommendation for its industry-leading noise cancellation and balanced sound profile. 

If you're looking for something more comfort-oriented, the **Bose QuietComfort 45** offers a lighter fit with physical buttons that many users prefer for tactile control. For those prioritizing battery life, the **Sennheiser Momentum 4** is currently leading the pack with up to 60 hours on a single charge.

### Key Comparison

| Model | Primary Strength | Battery Life |
|-------|------------------|--------------|
| Sony XM4 | Noise Cancelling | 30 Hours |
| Bose QC45 | Comfort | 24 Hours |
| Sennheiser M4 | Battery Life | 60 Hours |

I've populated the results panel with direct links to these products. Which of these features is most important for your use case?`
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
