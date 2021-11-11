export class Review {
    private reviewId: string;
	private reviewerUsername: string;
	private revieweeUsername: string;
	private comment: string;
	private ratingValue: string;
	private reviewDate: string;

    constructor(reviewId: string, reviewerUsername: string, revieweeUsername: string, comment: string, ratingValue: string, reviewDate: string ){
        this.reviewId = reviewId;
        this.reviewerUsername = reviewerUsername;
        this.revieweeUsername = revieweeUsername;
        this.comment = comment;
        this.ratingValue = ratingValue;
        this.reviewDate = reviewDate;
    }

}