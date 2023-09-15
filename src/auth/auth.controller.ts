import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('/login')
    async login(@Body() loginPayload: { user_name: string, password: string }) {
        return this.authService.login(loginPayload)
    }
}
