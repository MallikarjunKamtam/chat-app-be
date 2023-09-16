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

        const generatedToken = await this.jwtService.signAsync({ user })

        return { token: generatedToken, user_name: user.user_name }
    }


    async logout(user_name: string) {
        return { message: 'Success' }
    }


    async verifyUser(token: string) {

        if (token) {
            try {
                const payload = await this.jwtService.verifyAsync(
                    token.split(' ')[1],
                    {
                        secret: process.env.JWT_CONSTANT
                    }
                );

                return payload
            } catch {
                throw new UnauthorizedException();
            }
        }

    }




}

