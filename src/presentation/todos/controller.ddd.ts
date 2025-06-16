import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {

    /* Dependency Injection */
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    public getTodos = async(req: Request, res: Response): Promise<void> => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }

    public getTodoById = async(req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID argument must be a number' });
            return;
        }

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public createTodo = async(req: Request, res: Response): Promise<void> => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
        
        if (error) {
            res.status(400).json({ error });
            return;
        }

        try {
            const todo = await this.todoRepository.create(createTodoDto!);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public updateTodo = async(req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        
        try {
            const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
            res.json(updatedTodo);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public deleteTodo = async(req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;

        try {
            const deleted = await this.todoRepository.deleteById(id);
            res.json(deleted);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}
