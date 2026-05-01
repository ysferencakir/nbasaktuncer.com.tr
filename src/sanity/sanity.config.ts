import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { getSanityPublicEnv } from "@/lib/sanity/env";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const env = getSanityPublicEnv();

export default defineConfig({
  name: "default",
  title: "N. Başak Tuncer Studio",
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
