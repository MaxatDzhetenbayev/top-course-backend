import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';
export interface ReviewModel extends Base {
}
export declare class ReviewModel extends TimeStamps {
    name: string;
    title: string;
    description: string;
    rating: number;
    productId: mongoose.Types.ObjectId;
}
