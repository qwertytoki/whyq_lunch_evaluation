export class Menu {
  id: string;
  name: string;
  store_name: string;
  review_score: number;
  photo_url: string;

  constructor(
    id: string,
    name: string,
    store_name: string,
    review_score: number,
    photo_url: string,
  ) {
    this.id = id;
    this.name = name;
    this.store_name = store_name;
    this.review_score = review_score;
    this.photo_url = photo_url;
  }
}
