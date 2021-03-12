import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

type AccessTokenObject = {
    access_token: any;
}

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService    
    ) {}

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            user.password = null;
            return user;
        }

        return null;
    }

    async login(user: User): Promise<AccessTokenObject> {
        const payload = {username: user.username, sub: user.userId}
        return { access_token: this.jwtService.sign(payload) }
    }
}
