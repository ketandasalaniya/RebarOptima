import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [UsersModule, CompaniesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

