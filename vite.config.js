import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
	/* The mode parameter corresponds to the value passed with --mode during build.
 Vite defaults to development in dev and production in build (vite build or vite build --mode production).*/
	const isProduction = mode === "production";

	return {
		publicDir: false, // Vite will copy all files from this directory to the output including manifest.json

		build: {
			rollupOptions: {
				input: path.resolve(__dirname, "src/theme.scss"),
				output: {
					assetFileNames: "theme.css",
				},
			},

			minify: isProduction, // Enable minification in production
			cssMinify: isProduction, // Minify CSS only in production
			outDir: ".", // Output to root directory
			emptyOutDir: false, // Important: Don't empty the root directory!

			cssTarget: "esnext",
		},
	};
});
