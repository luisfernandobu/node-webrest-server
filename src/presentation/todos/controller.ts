import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodoController {

    /* Dependency Injection */
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    public getTodos = (req: Request, res: Response): void => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
    }

    public getTodoById = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'id argument must be a number' });
            return;
        }

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }

    public createTodo = (req: Request, res: Response): void => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
        
        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }

    public updateTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }

    public deleteTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'id argument must be a number' });
            return;
        }        

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }
}
