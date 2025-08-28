import { execSync } from "node:child_process";
import chalk from "chalk";
import { consola } from "consola";

/**
 * Runs the version-bump command with specified options.
 */
function runBumpCommand(): void {
	const command =
		'bunx bump manifest.json package.json --commit "v%s" --tag "%s"';

	console.log(chalk.blue(`\nExecuting: ${command}`));
	try {
		execSync(command, { stdio: "inherit" });
		console.log(chalk.green("\n✅ Bump command executed successfully."));
	} catch (error) {
		console.error(chalk.red(`\n❌ Error during version bump: ${error}`));
		process.exit(1);
	}
}

/**
 * Pushes changes and tags to git.
 */
function pushToGit(): void {
	console.log(chalk.yellow("\n⏳ Pushing changes and tags to git..."));
	try {
		execSync("git push", { stdio: "inherit" });
		execSync("git push --tags", { stdio: "inherit" });
		console.log(chalk.green("\n✅ Git push completed successfully."));
		console.log(
			chalk.cyan(
				"\n🤖 GitHub Action will now create the release automatically!",
			),
		);
	} catch (error) {
		console.error(chalk.red(`\n❌ Error pushing to git: ${error}`));
		process.exit(1);
	}
}

/**
 * Verify required files exist before deployment
 */
function verifyFiles(): void {
	console.log(chalk.yellow("🔍 Verifying required files..."));

	const requiredFiles = ["theme.css", "manifest.json"];
	const missingFiles: string[] = [];

	for (const file of requiredFiles) {
		try {
			execSync(`test -f ${file}`, { stdio: "ignore" });
			console.log(chalk.white(`${file} ✓✓`));
		} catch {
			missingFiles.push(file);
			console.log(chalk.red(`❌ ${file} not found`));
		}
	}

	if (missingFiles.length > 0) {
		console.error(
			chalk.red.bold(`Missing required files: ${missingFiles.join(", ")}`),
		);
		process.exit(1);
	}

	console.log(chalk.green("✅ All required files verified"));
}

// Function to display menu and handle selection
async function showMenu() {
	// For select type prompt
	const choice = await consola.prompt(
		"Push changes and create GitHub release?",
		{
			type: "select",
			options: [
				{ label: "Yes, push and create release", value: "1" },
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

	// Verify files first
	verifyFiles();

	// Bump version and create tag
	runBumpCommand();

	// Ask user if they want to push and create release
	await showMenu();

	console.log(chalk.magenta.bold("✨ Deployment process complete! ✨"));
}

deploy();
