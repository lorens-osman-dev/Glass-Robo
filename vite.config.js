// vite.config.js
import { defineConfig } from "vite";
import path from "node:path";
import { SourceMap } from "node:module";

export default defineConfig({
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

		css: {
			// Optional: Add more specific CSS processing options
			preprocessorOptions: {
				scss: {
					// SCSS specific options
				},
			},
			devSourcemap: true, // Enable source maps,
		},
	},
});
