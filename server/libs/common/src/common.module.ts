import { Module, Global } from '@nestjs/common'
import { CommonService } from './common.service'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from '@libs/db'
import { JwtModule, JwtService } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory() {
        return { secret: process.env.JWT_SECRET_KEY }
      },
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
