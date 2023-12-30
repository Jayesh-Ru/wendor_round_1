import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.todoService.find(id);
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('title') title: string) {
    return this.todoService.update(id, title);
  }

  @Put(':id/status/')
  updateStatus(
    @Param('id') id: number,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.todoService.updateStatus(id, isCompleted);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
