import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { StockModule } from './modules/stock/stock.module';
import { OptimizerModule } from './modules/optimizer/optimizer.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SettingsModule } from './modules/settings/settings.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompaniesModule,
    ProjectsModule,
    InventoryModule,
    StockModule,
    OptimizerModule,
    ReportsModule,
    SettingsModule,
    NotificationsModule,
    AuditModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
