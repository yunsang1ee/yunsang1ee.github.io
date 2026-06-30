import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { categories } from "../data/site";

export type PostEntry = CollectionEntry<"posts">;
export type ProjectEntry = CollectionEntry<"projects">;

export const postHref = (post: PostEntry) => `/blog/${post.id}/`;
export const projectHref = (project: ProjectEntry) => `/projects/${project.id}/`;

export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function getPublishedPosts() {
  const posts = await getCollection("posts");
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
}

export function getAllTags(posts: PostEntry[]) {
  const tags = posts.flatMap((post) => post.data.tags);
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
}

export function getTagCounts(posts: PostEntry[]) {
  return Object.fromEntries(
    getAllTags(posts).map((tag) => [
      tag,
      posts.filter((post) => post.data.tags.includes(tag)).length
    ])
  );
}

export function getCategoryCounts(posts: PostEntry[]) {
  return Object.fromEntries(
    categories.map((category) => [
      category.slug,
      posts.filter((post) => post.data.category === category.slug).length
    ])
  );
}

export function getSeriesGroups(posts: PostEntry[]) {
  const groups = new Map<string, { title: string; slug: string; posts: PostEntry[] }>();

  posts.forEach((post) => {
    if (!post.data.series) return;
    const { slug, title } = post.data.series;
    const group = groups.get(slug) ?? { title, slug, posts: [] };
    group.posts.push(post);
    groups.set(slug, group);
  });

  return [...groups.values()]
    .map((group) => ({
      ...group,
      posts: group.posts.sort((a, b) => (a.data.series?.order ?? 999) - (b.data.series?.order ?? 999))
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getRelatedPosts(post: PostEntry, posts: PostEntry[]) {
  const sourceTags = new Set(post.data.tags);

  return posts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score:
        Number(candidate.data.category === post.data.category) +
        candidate.data.tags.filter((tag) => sourceTags.has(tag)).length
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .map((candidate) => candidate.post)
    .slice(0, 4);
}
