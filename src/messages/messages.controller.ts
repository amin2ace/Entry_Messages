import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get('/:id')
  async getOneMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not exist!!!');
    }
  }

  @Get()
  getMessagesAll() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() message: CreateMessageDto) {
    return this.messagesService.create(message.content);
  }
}
