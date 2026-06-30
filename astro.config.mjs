import { defineConfig } from "astro/config";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserPage = repository?.toLowerCase() === "yunsang1ee.github.io";
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repository && !isUserPage ? `/${repository}` : "/");

export default defineConfig({
  site: "https://yunsang1ee.github.io",
  base,
  trailingSlash: "always"
});
