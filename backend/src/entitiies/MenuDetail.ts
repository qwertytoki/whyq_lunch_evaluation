export class MenuDetail {
    id: string;
    name: string;
    storeName: string;
    reviewScore: number;
    photoUrl: string;
    reviewComments: string[];
    listed_history: Date[];

    constructor(
        id: string,
        name: string,
        storeName: string,
        reviewScore: number,
        photoUrl: string,
        reviewComments: string[],
        listed_history: Date[],
    ) {
        this.id = id;
        this.name = name;
        this.storeName = storeName;
        this.reviewScore = reviewScore;
        this.photoUrl = photoUrl;
        this.reviewComments = reviewComments;
        this.listed_history = listed_history;
    }
}
