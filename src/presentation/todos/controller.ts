import { Request, Response } from "express";

let todos = [
	{ id: 1, text: "Buy milk", completedAt: new Date() },
	{ id: 2, text: "Buy bread", completedAt: new Date() },
	{ id: 3, text: "Buy butter", completedAt: null },
];

export class TodoController {
	//* DI

	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		return res.json(todos);
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id)) {
			return res.status(400).json({ error: `ID argument is not a number` });
		}

		const todo = todos.find((todo) => todo.id === id);

		if (!todo) {
			return res.status(404).json({ error: `Todo with id ${id} not found` });
		}

		return res.json(todo);
	};

	public createTodo = (req: Request, res: Response) => {
		const { text } = req.body;

		if (!text) {
			return res.status(400).json({ error: "Text property is required" });
		}

		const newTodo = {
			id: todos.length + 1,
			text: text,
			completedAt: new Date(),
		};

		todos.push(newTodo);

		res.json(newTodo);
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = +req.params.id;

		if (isNaN(id)) {
			return res.status(400).json({ error: `ID argument is not a number` });
		}

		const todo = todos.find((todo) => todo.id === id);

		if (!todo) {
			return res.status(404).json({ error: `Todo with id ${id} not found` });
		}

		const { text, completedAt } = req.body;

        todo.text = text || todo.text;

        if (completedAt === "null")
        {
            todo.completedAt = null;
        }
        else 
        {
            todo.completedAt = new Date(completedAt || todo.completedAt);
        }


        return res.json(todo);
	};

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        const existe = todos.find(todo => todo.id === id);

        if (!existe)
        {
            return res.status(404).json({ error: `ID doesn't exists` });
        }

		const newTodos = todos.filter((todo) => todo.id !== id);

		todos = newTodos;

        return res.json(existe);

    }
}
