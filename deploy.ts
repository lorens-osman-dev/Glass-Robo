import { execSync } from "node:child_process";
import chalk from "chalk";

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

/**
 * Main deployment function.
 */
function deploy(): void {
	console.log(chalk.magenta.bold("🚀 Starting deployment process..."));

	runBumpCommand();
	// pushToGit();

	console.log(chalk.magenta.bold("✨ Deployment complete! ✨"));
}

deploy();
