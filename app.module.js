"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./product/product.module");
const top_page_module_1 = require("./top-page/top-page.module");
const review_module_1 = require("./review/review.module");
const dist_1 = require("@nestjs/config/dist");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongo_config_1 = require("./configs/mongo.config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            dist_1.ConfigModule.forRoot(),
            nestjs_typegoose_1.TypegooseModule.forRootAsync({
                imports: [dist_1.ConfigModule],
                inject: [dist_1.ConfigService],
                useFactory: mongo_config_1.getMongoConfig
            }),
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            top_page_module_1.TopPageModule,
            review_module_1.ReviewModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map