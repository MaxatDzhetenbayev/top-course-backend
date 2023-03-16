declare class ProductCharacteristicsDto {
    name: string;
    value: string;
}
export declare class CreateProductDto {
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
    characteristics: ProductCharacteristicsDto[];
}
export {};
