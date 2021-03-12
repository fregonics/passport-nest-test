import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/users.service";
import { jwtConstants, JwtPayload } from "./auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        return { 
            userId: parseInt(payload.sub, 10), 
            username: payload.username,
            password: null 
        }
    }

}
