import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }


    async login({ password, user_name }: { user_name: string, password: string }) {
        const user = await this.userService.findUserByUserName(user_name)
        console.log(user, 'useruseruser')
        if (!user || user.password !== password) {
            throw new UnauthorizedException()
        }

        const generatedToken = await this.jwtService.signAsync({ user })

        return { token: generatedToken, user_name: user.user_name }
    }


    async logout(user_name: string) {

        return { message: 'Success' }
    }
}
