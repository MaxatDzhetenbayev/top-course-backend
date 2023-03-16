import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(dto: CreateReviewDto): Promise<import("@typegoose/typegoose").DocumentType<import("./review.model").ReviewModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    delete(id: string): Promise<void>;
    getByProduct(productId: string): Promise<import("@typegoose/typegoose").DocumentType<import("./review.model").ReviewModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    deleteReviewsByProductId(productId: string): Promise<import("mongodb").DeleteResult>;
}
