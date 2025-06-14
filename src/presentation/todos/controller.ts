import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {

    /* Dependency Injection */
    // constructor() {}

    public getTodos = async(req: Request, res: Response): Promise<void> => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById = async(req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID argument must be a number' });
            return;
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });
        
        (todo) 
        ? res.json(todo)
        : res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    public createTodo = async(req: Request, res: Response): Promise<void> => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
        
        if (error) {
            res.status(400).json({ error })
            return;
        }

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    }

    public updateTodo = async(req: Request, res: Response): Promise<void> => {
        const id = req.params.id;

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json({ error })
            return;
        }

        const todoId = updateTodoDto!.id
        const todo = await prisma.todo.findUnique({
            where: { id: todoId }
        });
        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} not found` });
            return;
        }
        
        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);
    }

    public deleteTodo = async(req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });
        if (!todo) {
            res.status(404).json({ error: `TODO with id ${id} not found` });
            return;
        }

        const deletedUser = await prisma.todo.delete({
            where: {
                id: id
            }
        })

        res.json(deletedUser);
    }
}
