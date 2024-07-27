export class Menu {
    id: number;
    name: string;
    review_score: number;
    photo_url: string;

    constructor(id: number, name: string, review_score: number, photo_url: string) {
        this.id = id;
        this.name = name;
        this.review_score = review_score;
        this.photo_url = photo_url;
    }
}
