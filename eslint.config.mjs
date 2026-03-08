import next from "eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...next(),
]);
