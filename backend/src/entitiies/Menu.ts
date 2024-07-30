export class Menu {
    name: string;
    reviewScore: number;
    photoUrl: string;

    constructor(name: string, reviewScore: number, photoUrl: string) {
        this.name = name;
        this.reviewScore = reviewScore;
        this.photoUrl = photoUrl;
    }
}
