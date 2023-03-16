import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
export interface ProductModel extends Base {
}
declare class ProductCharacteristics {
    name: string;
    value: string;
}
export declare class ProductModel extends TimeStamps {
    image: string;
    title: string;
    description: string;
    tags: string[];
    categories: string[];
    price: number;
    oldPrice?: number;
    credit: string;
    advantages: string;
    disAdvantages: string;
    characteristics: ProductCharacteristics[];
}
export {};
