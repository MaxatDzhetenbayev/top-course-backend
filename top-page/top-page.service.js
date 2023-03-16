"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopPageService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const top_page_model_1 = require("./top-page.model");
let TopPageService = class TopPageService {
    constructor(pageModel) {
        this.pageModel = pageModel;
    }
    async create(dto) {
        return this.pageModel.create(dto);
    }
    async findPageById(id) {
        return this.pageModel.findById(id).exec();
    }
    async findPageByAlias(alias) {
        return this.pageModel.findOne({ alias }).exec();
    }
    async deleteById(id) {
        return this.pageModel.deleteOne({ _id: id }).exec();
    }
    async updatePageById(id, dto) {
        return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async findByCategory(firstLevelCategory) {
        return this.pageModel.aggregate()
            .match({ firstLevelCategory })
            .group({
            _id: '$secondLevelCategory',
            pages: { '$push': { alias: '$alias', title: '$title' } }
        })
            .exec();
    }
    async findByQueryText(text) {
        return this.pageModel.find({ $text: { $search: text, $caseSensitive: false } });
    }
};
TopPageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(top_page_model_1.TopPageModel)),
    __metadata("design:paramtypes", [Object])
], TopPageService);
exports.TopPageService = TopPageService;
//# sourceMappingURL=top-page.service.js.map