import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId, studioUrl } from "./src/sanity/env";

export default defineConfig({
  name: "gray-method-training",
  title: "Gray Method Training",
  projectId: projectId || "REPLACE_WITH_PROJECT_ID",
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Blog Posts").schemaType("post").child(S.documentTypeList("post")),
            S.listItem().title("Categories").schemaType("category").child(S.documentTypeList("category")),
            S.listItem().title("Authors").schemaType("author").child(S.documentTypeList("author")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  basePath: studioUrl,
  apiVersion,
});
