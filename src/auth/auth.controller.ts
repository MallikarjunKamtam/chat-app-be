import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('/login')
    async login(@Body() loginPayload: { user_name: string, password: string }) {
        const token = await this.authService.login(loginPayload)
        return token
    }


    @Post('/logout')
    async logout(@Body() logoutPayload: { user_name: string }) {

        return await this.authService.logout(logoutPayload?.user_name)
    }
}
