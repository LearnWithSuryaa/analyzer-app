#!/usr/bin/env node

const prompts = require("prompts");
const chalk = require("chalk");
const degit = require("degit");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log(chalk.cyan.bold("\n🎯 Create Javanese Analyzer App\n"));

  // Get project name from args or prompt
  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What is your project name?",
      initial: "my-javanese-analyzer",
      validate: (value) => {
        if (!value) return "Project name is required";
        if (!/^[a-z0-9-_]+$/.test(value)) {
          return "Project name can only contain lowercase letters, numbers, hyphens, and underscores";
        }
        return true;
      },
    });

    if (!response.projectName) {
      console.log(chalk.red("\n❌ Project creation cancelled"));
      process.exit(1);
    }

    projectName = response.projectName;
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`\n❌ Directory "${projectName}" already exists!`));
    process.exit(1);
  }

  console.log(
    chalk.blue(`\n📦 Creating project in ${chalk.bold(targetDir)}...\n`)
  );

  try {
    // Clone template using degit
    console.log(chalk.gray("⏳ Downloading template..."));
    const emitter = degit("LearnWithSuryaa/analyzer-app", {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(targetDir);
    console.log(chalk.green("✓ Template downloaded"));

    // Install dependencies
    console.log(chalk.gray("\n⏳ Installing dependencies..."));
    console.log(chalk.dim("This might take a few minutes...\n"));

    execSync("npm install", {
      cwd: targetDir,
      stdio: "inherit",
    });

    console.log(chalk.green("\n✓ Dependencies installed"));

    // Success message
    console.log(chalk.green.bold("\n✨ Success! Created " + projectName));
    console.log("\n" + chalk.cyan("Next steps:"));
    console.log(chalk.gray("  cd " + projectName));
    console.log(chalk.gray("  npm run dev"));
    console.log("\n" + chalk.cyan("Your app will be running at:"));
    console.log(chalk.bold("  http://localhost:3000"));
    console.log("\n" + chalk.dim("Happy coding! 🚀\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error creating project:"), error.message);

    // Cleanup on error
    if (fs.existsSync(targetDir)) {
      console.log(chalk.gray("Cleaning up..."));
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});
