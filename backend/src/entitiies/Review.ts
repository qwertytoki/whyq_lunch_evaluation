export class Review {
    id: string;
    menuName: string;
    reviewComment: string;
    reviewScore: number;
    date: Date;

    constructor(
        id: string,
        menuName: string,
        reviewComment: string,
        reviewScore: number,
        date: Date,
    ) {
        this.id = id;
        this.menuName = menuName;
        this.reviewComment = reviewComment;
        this.reviewScore = reviewScore;
        this.date = date;
    }
}
