export default {
	ignores: [(commit) => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	rules: {
		"body-leading-blank": [1, "always"],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"type-enum": [
			2,
			"always",
			["clean", "add", "fix", "pc", "mobile", "general", "update", "refactor"],
		],
	},
};
