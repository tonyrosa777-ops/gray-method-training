import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "./client";

// Lazily build the builder once
let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder() {
  if (!_builder) {
    const client = getSanityClient(false);
    if (client) _builder = imageUrlBuilder(client);
  }
  return _builder;
}

/**
 * urlFor — wraps Sanity's image URL builder.
 * Returns a chainable builder or a stub that always returns "" when Sanity is unconfigured.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  const builder = getBuilder();
  // If Sanity is not configured, return a typed stub so callers compile cleanly
  if (!builder || !source) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return imageUrlBuilder({ projectId: "placeholder", dataset: "production" } as any).image(source ?? {});
  }
  return builder.image(source);
}
