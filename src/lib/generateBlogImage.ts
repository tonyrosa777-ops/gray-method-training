/**
 * generateBlogImage
 *
 * Calls fal.ai fal-ai/flux/schnell to produce a 16:9 hero image for a blog post.
 * Returns the CDN URL on success, null on any failure (no key, API error, timeout).
 * Never throws — always safe to call without a try/catch at the call site.
 */

interface FalResponse {
  images: Array<{ url: string; width: number; height: number }>;
}

function buildPrompt(title: string, category: string | null): string {
  const context = category
    ? `${category.toLowerCase()} health and fitness`
    : "health and fitness coaching";

  return [
    `Editorial photo for a ${context} blog post titled "${title}".`,
    "Cinematic fitness lifestyle photography.",
    "Warm golden tones, dark moody background, professional studio lighting.",
    "Woman in her 40s or 50s, strong and confident, gym or outdoor setting.",
    "No text, no logos, no watermarks.",
    "16:9 format, magazine quality.",
  ].join(" ");
}

export async function generateBlogImage(
  title: string,
  category: string | null = null
): Promise<string | null> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: buildPrompt(title, category),
        image_size: "landscape_16_9",
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as FalResponse;
    return data.images?.[0]?.url ?? null;
  } catch {
    return null;
  }
}
