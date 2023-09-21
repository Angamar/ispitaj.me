import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern: [
      "e2e/1-getting-started/**",
      "e2e/2-advanced-examples/**",
    ],
  },
});
