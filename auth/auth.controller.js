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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const auth_dto_1 = require("./dto/auth.dto");
const pipes_1 = require("@nestjs/common/pipes");
const auth_service_1 = require("./auth.service");
const auth_constants_1 = require("./auth.constants");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        const user = await this.authService.findUser(dto.login);
        if (user) {
            throw new common_1.HttpException(auth_constants_1.USER_EXISTS_ERROR, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.authService.create(dto);
    }
    async login({ login, password }) {
        const { email } = await this.authService.validateUser(login, password);
        return await this.authService.login(email);
    }
};
__decorate([
    (0, common_1.UsePipes)(new pipes_1.ValidationPipe()),
    (0, decorators_1.HttpCode)(201),
    (0, decorators_1.Post)('register'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UsePipes)(new pipes_1.ValidationPipe()),
    (0, decorators_1.HttpCode)(200),
    (0, decorators_1.Post)('login'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map