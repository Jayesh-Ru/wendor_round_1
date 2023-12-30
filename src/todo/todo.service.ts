import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { Logger, LogLevel } from '../utils/logger';
const logger = new Logger('todo.log', LogLevel.INFO);

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoReposity: Repository<Todo>,
  ) {}

  async findAll() {
    try {
      const lists = await this.todoReposity.find();
      const returnObj = {};
      if (!lists.length) {
        returnObj['error'] = true;
        returnObj['msg'] = 'Your Schedule is clear. No to-do lists find!!';
        logger.debug(returnObj['msg']);
        return returnObj;
      } else {
        logger.info('succesfully retreived to-do lists');
        return lists;
      }
    } catch (error: any) {
      logger.error(`unknown error occured in todo.service: ${error}`);
      return { error: true, msg: 'unknown error occured! please try again.' };
    }
  }

  async find(id: number) {
    try {
      const task = await this.todoReposity.find({
        where: {
          id: id,
        },
      });
      const returnObj = {};
      if (!task.length) {
        returnObj['error'] = true;
        returnObj['msg'] = "The task doesn't exist!! ";
        logger.debug(returnObj['msg']);
        return returnObj;
      } else {
        logger.info(`succesfully retreived to-do list with id: ${id}`);
        return task[0];
      }
    } catch (error: any) {
      logger.error(`unknown error occured in todo.service: ${error}`);
      return { error: true, msg: 'unknown error occured! please try again.' };
    }
  }

  async create(title: string) {
    try {
      const t = await this.todoReposity.find({
        where: {
          title: title,
        },
      });
      const returnObj: object = {};
      if (t.length) {
        returnObj['error'] = true;
        returnObj['msg'] = 'an active task with this title already exists';
        logger.info(returnObj['msg']);
        return returnObj;
      }
      const todo = new Todo();
      todo.title = title;
      return this.todoReposity.save(todo);
    } catch (error: any) {
      logger.error(`unknown error occured in todo.service: ${error}`);
      return { error: true, msg: 'unknown error occured! please try again.' };
    }
  }

  async update(id: number, title: string) {
    try {
      const todo = await this.todoReposity.findOne({ where: { id: id } });
      const returnObj: object = {};
      if (!todo) {
        returnObj['error'] = true;
        returnObj['msg'] = 'unable to update the requested task';
        logger.info(returnObj['msg']);
        return returnObj;
      }
      todo.title = title;

      return this.todoReposity.save(todo);
    } catch (error: any) {
      logger.error(`unknown error occured in todo.service: ${error}`);
      return { error: true, msg: 'unknown error occured! please try again.' };
    }
  }

  async updateStatus(id: number, isCompleted: boolean) {
    try {
      const todo = await this.todoReposity.findOne({ where: { id: id } });
      const returnObj: object = {};
      if (!todo) {
        returnObj['error'] = true;
        returnObj['msg'] = 'unable to update the requested task';
        logger.info(returnObj['msg']);
        return returnObj;
      }
      todo.isCompleted = Boolean(isCompleted);

      return this.todoReposity.save(todo);
    } catch (error: any) {
      logger.error(`unknown error occured in todo.service: ${error}`);
      return { error: true, msg: 'unknown error occured! please try again.' };
    }
  }
  delete(id: number) {
    const returnObj = {};

    return this.todoReposity
      .delete(id)
      .then((a) => {
        if (a.affected) {
          returnObj['msg'] = 'the task has been deleted';
          logger.info(returnObj['msg']);
          return returnObj;
        } else {
          returnObj['error'] = true;
          returnObj['msg'] = 'nothing to delete';
          logger.info(returnObj['msg']);
          return returnObj;
        }
      })
      .catch((error) => {
        logger.error(`unknown error in todo.service: ${error}`);
        console.log(error);
      });
  }
}
