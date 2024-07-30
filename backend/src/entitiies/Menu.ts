export class Menu {
    id: string;
    name: string;
    reviewScore: number;
    photoUrl: string;

    constructor(
        id: string,
        name: string,
        reviewScore: number,
        photoUrl: string,
    ) {
        this.id = id;
        this.name = name;
        this.reviewScore = reviewScore;
        this.photoUrl = photoUrl;
    }
}
