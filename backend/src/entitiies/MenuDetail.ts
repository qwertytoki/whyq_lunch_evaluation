export class MenuDetail {
    name: string;
    reviewScore: number;
    photoUrl: string;
    reviewComments: string[];
    listed_history: Date[];

    constructor(
        name: string,
        reviewScore: number,
        photoUrl: string,
        reviewComments: string[],
        listed_history: Date[],
    ) {
        this.name = name;
        this.reviewScore = reviewScore;
        this.photoUrl = photoUrl;
        this.reviewComments = reviewComments;
        this.listed_history = listed_history;
    }
}
