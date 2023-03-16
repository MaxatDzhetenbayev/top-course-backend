/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePageDto } from './dto/create-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';
export declare class TopPageService {
    private readonly pageModel;
    constructor(pageModel: ModelType<TopPageModel>);
    create(dto: CreatePageDto): Promise<DocumentType<TopPageModel>>;
    findPageById(id: Pick<TopPageModel, '_id'>): Promise<DocumentType<TopPageModel> | null>;
    findPageByAlias(alias: Pick<TopPageModel, 'alias'>): Promise<DocumentType<TopPageModel> | null>;
    deleteById(id: Pick<TopPageModel, '_id'>): Promise<import("mongodb").DeleteResult>;
    updatePageById(id: Pick<TopPageModel, '_id'>, dto: TopPageModel): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TopPageModel> & TopPageModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findByCategory(firstLevelCategory: TopLevelCategory): Promise<any[]>;
    findByQueryText(text: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TopPageModel> & TopPageModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
