import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Go to the gym', completedAt: null },
    { id: 3, text: 'Study node.js', completedAt: new Date() },
];

export class TodoController {

    /* Dependency Injection */
    // constructor() {}

    public getTodos = (req: Request, res: Response): void => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ message: 'ID argument must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);
        
        (todo) 
        ? res.json(todo)
        : res.status(404).json({ message: `TODO with id ${id} not found` });
    }

    public createTodo = (req: Request, res: Response): void => {
        const { text } = req.body;
        
        if (!text) {
            res.status(400).json({ message: 'Text property is required' })
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        };
        
        todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ message: 'ID argument must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: `TODO with id ${id} not found` });
            return;
        }

        const { text, completedAt } = req.body;
        if (!text) {
            res.status(404).json({ message: 'Text property is required' });
            return;
        }

        todo.text = text || todo.text;
        todo.completedAt = (completedAt === 'null') 
                            ? null
                            : new Date(completedAt || todo.completedAt);

        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: `TODO with id ${id} not found` });
            return;
        }

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    }
}
