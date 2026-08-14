export type StudioImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9";

const BASE_URL = "https://console.enterprise.trae.ai/api/ide/v1/text_to_image";

export function buildStudioImage(prompt: string, imageSize: StudioImageSize): string {
  return `${BASE_URL}?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;
}
