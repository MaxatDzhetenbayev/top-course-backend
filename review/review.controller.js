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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const create_review_dto_1 = require("./dto/create-review.dto");
const review_constants_1 = require("./review.constants");
const review_service_1 = require("./review.service");
const decorators_2 = require("@nestjs/common/decorators");
const pipes_1 = require("@nestjs/common/pipes");
const jwt_guard_1 = require("../guards/jwt.guard");
const id_validation_pipe_1 = require("../pipes/id-validation.pipe");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async create(dto) {
        return this.reviewService.create(dto);
    }
    async delete(id) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new common_1.HttpException(review_constants_1.REVIEW_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getByProduct(productId) {
        return this.reviewService.findByProductId(productId);
    }
    async deleteReviewsByProductId(productId) {
        return this.reviewService.deleteReviewsByProductId(productId);
    }
};
__decorate([
    (0, decorators_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, decorators_2.UsePipes)(new pipes_1.ValidationPipe),
    (0, decorators_1.HttpCode)(201),
    (0, decorators_1.Post)(''),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    (0, decorators_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, decorators_1.HttpCode)(202),
    (0, decorators_1.Delete)(':id'),
    __param(0, (0, decorators_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "delete", null);
__decorate([
    (0, decorators_1.HttpCode)(200),
    (0, decorators_1.Get)('byProduct/:productId'),
    __param(0, (0, decorators_1.Param)('productId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getByProduct", null);
__decorate([
    (0, decorators_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, decorators_1.Delete)('byProduct/:id'),
    __param(0, (0, decorators_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReviewsByProductId", null);
ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map