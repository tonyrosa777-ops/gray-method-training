/**
 * Sanity environment variables
 *
 * Add to .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_READ_TOKEN=your_read_token   (for on-demand ISR)
 *   SANITY_REVALIDATE_SECRET=your_secret    (webhook verification)
 *
 * See SETUP.md for full Sanity setup instructions.
 */

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const studioUrl = "/studio";
