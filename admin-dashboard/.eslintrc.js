module.exports = {
  // extends: [
  //   'next',
  //   'next/core-web-vitals',
  //   'eslint:recommended',
  //   'plugin:react/recommended',
  //   'prettier', // Ensure this is at the end to override conflicting rules
  //   "plugin:prettier/recommended"
  // ],
  extends: ["next", "next/core-web-vitals", "eslint:recommended", "prettier"],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error', // Report Prettier formatting issues as ESLint errors
    'react/react-in-jsx-scope': 'off', // Next.js handles React import automatically
    // Add any other custom ESLint rules here
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
};