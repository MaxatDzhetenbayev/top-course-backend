import { TopLevelCategory } from '../top-page.model';
export declare class HhDataDto {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
}
export declare class PageAdvantageDto {
    title: string;
    description: string;
}
export declare class CreatePageDto {
    firstLevelCategory: TopLevelCategory;
    secondLevelCategory: string;
    alias: string;
    title: string;
    category: string;
    hh?: HhDataDto;
    advantages: PageAdvantageDto[];
    seoText: string;
    tagsTitle: string;
    tags: string[];
}
