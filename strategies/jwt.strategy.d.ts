import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserModel } from 'src/auth/user.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(email: Pick<UserModel, 'email'>): Promise<Pick<UserModel, "email">>;
}
export {};
