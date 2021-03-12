import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            user.password = null;
            return user;
        }

        return null;
    }

}
