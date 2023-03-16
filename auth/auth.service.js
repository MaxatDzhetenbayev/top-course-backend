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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("./user.model");
const bcryptjs_1 = require("bcryptjs");
const auth_constants_1 = require("./auth.constants");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usermodel, jwtService) {
        this.usermodel = usermodel;
        this.jwtService = jwtService;
    }
    async create(dto) {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const doc = new this.usermodel({
            email: dto.login,
            passwordHash: (0, bcryptjs_1.hashSync)(dto.password, salt)
        });
        return doc.save();
    }
    async findUser(email) {
        return this.usermodel.findOne({ email }).exec();
    }
    async validateUser(email, password) {
        const user = await this.findUser(email);
        if (!user) {
            throw new common_1.HttpException(auth_constants_1.USER_NOT_FOUND_ERROR, common_1.HttpStatus.UNAUTHORIZED);
        }
        const isCorrectPassword = (0, bcryptjs_1.compareSync)(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.HttpException(auth_constants_1.WRONG_PASSWORD_ERROR, common_1.HttpStatus.UNAUTHORIZED);
        }
        return { email: user.email };
    }
    async login(email) {
        const payload = { email };
        return {
            acces_token: await this.jwtService.sign(payload)
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map