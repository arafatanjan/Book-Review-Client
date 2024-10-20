export interface Review {
    _id: string;
    email?: string,
    title: string;
    author: string;
    reviewText: string;
    rating: number;
  }