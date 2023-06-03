// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended", "plugin:jsx-a11y/recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    react: {
      version: "18.2"
    }
  },
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": ["error", {
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: true,
      argsIgnorePattern: "^_"
    }],
    "react/react-in-jsx-scope": "off"
  }
};