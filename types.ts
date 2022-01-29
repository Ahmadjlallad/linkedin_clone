export interface Post {
  input: string;
  photoUrl: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  timestamp: string;
  _id: string;
}
export interface Location {
  continent: string;
  country: string;
  countryCode: string;
}
export interface Articles {
  author: null | string;
  content: null | string;
  description: null | string;
  publishedAt: string;
  source: { id: null | string; name: null | string };
  title: null | string;
  url: null | string;
  urlToImage: null | string;
}
