export class MenuDetail {
  id: number;
  name: string;
  store_name: string;
  review_score: number;
  photo_url: string;
  review_comments: string[];
  listed_history: Date[];

  constructor(
    id: number,
    name: string,
    store_name: string,
    review_score: number,
    photo_url: string,
    review_comments: string[],
    listed_history: Date[],
  ) {
    this.id = id;
    this.name = name;
    this.store_name = store_name;
    this.review_score = review_score;
    this.photo_url = photo_url;
    this.review_comments = review_comments;
    this.listed_history = listed_history;
  }
}
