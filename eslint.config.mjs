// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
  },
});
