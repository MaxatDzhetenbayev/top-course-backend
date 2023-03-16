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
exports.TopPageController = void 0;
const common_1 = require("@nestjs/common");
const find_top_page_dto_1 = require("./dto/find-top-page.dto");
const id_validation_pipe_1 = require("../pipes/id-validation.pipe");
const top_page_model_1 = require("./top-page.model");
const top_page_service_1 = require("./top-page.service");
const exceptions_1 = require("@nestjs/common/exceptions");
const top_page_consts_1 = require("./top-page.consts");
const create_page_dto_1 = require("./dto/create-page.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
let TopPageController = class TopPageController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async create(dto) {
        return this.pageService.create(dto);
    }
    async get(id) {
        const page = await this.pageService.findPageById(id);
        if (!page) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_NOT_FOUND_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        return page;
    }
    async getByAlias(alias) {
        const pageByAlias = await this.pageService.findPageByAlias(alias);
        if (!pageByAlias) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_NOT_FOUND_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        return pageByAlias;
    }
    async delete(id) {
        const deletedPage = await this.pageService.deleteById(id);
        if (!deletedPage) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_NOT_FOUND_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async patch(id, dto) {
        const updatedPage = await this.pageService.updatePageById(id, dto);
        if (!updatedPage) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_NOT_FOUND_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        return updatedPage;
    }
    async find(dto) {
        const categoryPages = await this.pageService.findByCategory(dto.firstLevelCategory);
        if (!categoryPages) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_BY_CATEGORY_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        return categoryPages;
    }
    async queryText(text) {
        const resPages = await this.pageService.findByQueryText(text);
        if (!resPages) {
            throw new exceptions_1.HttpException(top_page_consts_1.TOP_PAGE_BY_QUERY_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        return resPages;
    }
};
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_page_dto_1.CreatePageDto]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "get", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('byAlias/:alias'),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "getByAlias", null);
__decorate([
    (0, common_1.HttpCode)(202),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, top_page_model_1.TopPageModel]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "patch", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_top_page_dto_1.FindTopPageDto]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "find", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('query/:text'),
    __param(0, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopPageController.prototype, "queryText", null);
TopPageController = __decorate([
    (0, common_1.Controller)('top-page'),
    __metadata("design:paramtypes", [top_page_service_1.TopPageService])
], TopPageController);
exports.TopPageController = TopPageController;
//# sourceMappingURL=top-page.controller.js.map