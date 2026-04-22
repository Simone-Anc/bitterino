export interface IGPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

const IG_API = "https://graph.instagram.com/me/media";
const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";

export async function fetchInstagramPosts(limit = 6): Promise<IGPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const url = `${IG_API}?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    const posts: IGPost[] = (data.data ?? []).filter(
      (p: IGPost) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM"
    );
    return posts.slice(0, limit);
  } catch {
    return [];
  }
}
