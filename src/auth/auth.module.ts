import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule, } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
dotenv.config()





@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService,
    { useClass: AuthGuard, provide: APP_GUARD }
  ],
  controllers: [AuthController],
  exports: [AuthService],
})



export class AuthModule { }
