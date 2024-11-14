import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	publicDir: "public", // Vite will copy all files from this directory to the output including manifest.json

	build: {
		rollupOptions: {
			input: path.resolve(__dirname, "src/theme.scss"),

			output: {
				assetFileNames: "theme.css",
			},
		},

		minify: false, // Disable all minification
		cssMinify: false, // Specifically disable CSS minification
		outDir: "star", // Sets the output directory for the CSS file
		emptyOutDir: true,

		cssTarget: "esnext",
	},
});
