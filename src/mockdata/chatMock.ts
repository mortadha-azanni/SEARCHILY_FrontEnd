import { Product } from '../types';

export const mockGenerateAIResponse = (query: string): string => {
  return `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://www.svgrepo.com/show/372900/markdown.svg " ")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`


`};


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
