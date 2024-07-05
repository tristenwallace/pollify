import { defineConfig } from 'cypress';
import fs from 'fs';

function readEnvFile() {
  const envPath = 'cypress.env.json';
  if (fs.existsSync(envPath)) {
    return JSON.parse(fs.readFileSync(envPath, 'utf-8'));
  }
  return {};
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const env = readEnvFile();
      config.env = { ...config.env, ...env };
      return config;
    },
    baseUrl: 'http://localhost:3000',
    env: {
      REACT_APP_API_URL: 'http://localhost:5000',
      USERNAME: 'tristenwallace',
      PASSWORD: '123456',
    },
  },
});
