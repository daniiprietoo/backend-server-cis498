module.exports = [
  {
    env: {
      node: true,
      es2021: true,
    },
    extends: "eslint:recommended",
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      indent: ["error", 2],
      semi: ["error", "always"],
    },
  },
];
