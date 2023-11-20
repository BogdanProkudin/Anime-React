export const images: string[] = [
  'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
  'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
  'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
  'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
  'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
];

const imageByIndex = (index: number): string => images[index % images.length];

export default imageByIndex;
