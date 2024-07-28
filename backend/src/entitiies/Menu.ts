export class Menu {
    id: string;
    name: string;
    storeName: string;
    reviewScore: number;
    photoUrl: string;

    constructor(
        id: string,
        name: string,
        storeName: string,
        reviewScore: number,
        photoUrl: string,
    ) {
        this.id = id;
        this.name = name;
        this.storeName = storeName;
        this.reviewScore = reviewScore;
        this.photoUrl = photoUrl;
    }
}
