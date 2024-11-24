import express, { Router } from "express";
import path from "path";

interface ServerOptions {
	port: number;
	publicPath?: string;
	routes: Router;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: ServerOptions) {
		const { port, routes, publicPath = "public" } = options;

		this.port = port;
		this.publicPath = publicPath;
		this.routes = routes;
	}

	async start() {

		//* Middleware
		//Esto hace que el body de la petición enviado lo parsee como json
		this.app.use(express.json());

		this.app.use(express.urlencoded({extended: true})); //x-www-form-urlencoded

		//* Public Folder

		this.app.use(express.static(this.publicPath));

		//* Routes
		this.app.use(this.routes);

		//* Cualquier ruta no definida pasa por aquí
		this.app.get("*", (req, res) => {
			const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);

			res.sendFile(indexPath);
			return;
		});

		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}
