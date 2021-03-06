import { Controller, Get, UseInterceptors, Post, UploadedFile, HttpException } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
@ApiTags('默认接口')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: '初始化接口' })
    getHello(): string {
        return this.appService.getHello()
    }

    // 上传文件
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: '上传文件' })
    async uploads(@UploadedFile('file') file) {
        // 上传成功之后，返回一个地址，存入数据库且返回给前端进行显示图片
        try {
            const path = 'http://localhost:3002/uploads/' + file.filename
            console.log(file)
            return path
        } catch (error) {
            throw new HttpException({ message: '上传失败' }, 500)
        }
    }
}
