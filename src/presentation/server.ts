import express from "express";
import path from "path";

interface ServerOptions {
    port: number;
    publicPath?: string;
}

export class Server {
	private readonly app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: ServerOptions) {

        const { port, publicPath = 'public' } = options;

        this.port = port;
        this.publicPath = publicPath;

    }

	async start() {
		//* Middleware

		//* Public Folder

		this.app.use(express.static(this.publicPath));

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
