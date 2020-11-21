import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
    const response = {
      originalName: file.originalName,
      filename: file.filename,
    };
    return response;
  }
}
