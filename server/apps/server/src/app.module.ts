import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoachController } from './coach/coach.controller'
import { CoachModule } from './coach/coach.module'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { MulterModule } from '@nestjs/platform-express'
import { ActivitiesModule } from './activities/activities.module'
import { CommonModule } from '@app/common'

@Module({
    imports: [
        MulterModule.register({
            dest: 'uploads'
        }),
        CommonModule, // 之前把这个 module 给掉了，然后引入的 model 一直报错，教训
        CoachModule,
        AuthModule,
        CommentModule,
        ActivitiesModule
    ],
    controllers: [AppController, CoachController, AuthController],
    providers: [AppService]
})
export class AppModule {}
