import { execSync } from "node:child_process";
import chalk from "chalk";
import { consola } from "consola";
/**
 * Runs the version-bump command with specified options.
 */
function runBumpCommand(): void {
	const command =
		'bunx bump manifest.json package.json --commit "v%s" --tag "%s"';

	console.log(chalk.blue(`Executing: ${command}`));

	try {
		execSync(command, { stdio: "inherit" });
		console.log(chalk.green("✅ Bump command executed successfully."));
	} catch (error) {
		console.error(chalk.red(`❌ Error during version bump: ${error}`));
		process.exit(1);
	}
}

/**
 * Pushes changes and tags to git.
 */
function pushToGit(): void {
	console.log(chalk.yellow("⏳ Pushing changes to git..."));
	try {
		execSync("git push", { stdio: "inherit" });
		execSync("git push --tags", { stdio: "inherit" });
		console.log(chalk.green("✅ Git push completed successfully."));
	} catch (error) {
		console.error(chalk.red(`❌ Error pushing to git: ${error}`));
		process.exit(1);
	}
}

// Function to display menu and handle selection
async function showMenu() {
	// For select type prompt
	const choice = await consola.prompt(
		"Did you want to Push changes and tags to github ?",
		{
			type: "select",
			options: [
				{ label: "Yes", value: "1" },
				{ label: "Exit", value: "exit" },
			],
			cancel: "default",
		},
	);

	// Execute function based on choice
	switch (choice) {
		case "1":
			pushToGit();
			break;
		case "exit":
			consola.log(chalk.yellowBright("Goodbye!"));
			break;
		default:
			console.log(chalk.red.bold("canceled!!"));
	}
}
/**
 * Main deployment function.
 */
async function deploy(): Promise<void> {
	console.log(chalk.magenta.bold("🚀 Starting deployment process..."));

	runBumpCommand();
	await showMenu();

	console.log(chalk.magenta.bold("✨ Deployment complete! ✨"));
}

deploy();
