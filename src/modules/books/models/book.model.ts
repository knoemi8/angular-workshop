export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  comment: string;
  poster?: string;
}

export function parseGoogleBook({ volumeInfo }): Book {
  return {
    id: null,
    title: volumeInfo.title,
    author: volumeInfo.authors.join(', '),
    description: volumeInfo.description.replace(/<(?:.|\n)*?>/gm, ''),
    comment: '',
    poster: volumeInfo.imageLinks.small,
  };
}
