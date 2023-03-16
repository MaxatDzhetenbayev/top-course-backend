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
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';
import { CreatePageDto } from './dto/create-page.dto';
export declare class TopPageController {
    private readonly pageService;
    constructor(pageService: TopPageService);
    create(dto: CreatePageDto): Promise<import("@typegoose/typegoose").DocumentType<TopPageModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    get(id: Pick<TopPageModel, '_id'>): Promise<import("@typegoose/typegoose").DocumentType<TopPageModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getByAlias(alias: Pick<TopPageModel, 'alias'>): Promise<import("@typegoose/typegoose").DocumentType<TopPageModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    delete(id: Pick<TopPageModel, '_id'>): Promise<void>;
    patch(id: Pick<TopPageModel, '_id'>, dto: TopPageModel): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TopPageModel> & TopPageModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    find(dto: FindTopPageDto): Promise<any[]>;
    queryText(text: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, TopPageModel> & TopPageModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
