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
        if (!user || user.password !== password) {
            throw new UnauthorizedException()
        }

        const generatedToken = this.jwtService.signAsync({ user })

        return generatedToken
    }
}
