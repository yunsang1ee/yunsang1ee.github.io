import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  href: z.string()
});

const coverSchema = z
  .object({
    src: z.string(),
    alt: z.string()
  })
  .optional();

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    series: z
      .object({
        slug: z.string(),
        title: z.string(),
        order: z.number().int().positive().optional()
      })
      .optional(),
    type: z.enum(["note", "project-log", "study", "research-log", "retrospective"]).default("note"),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: coverSchema,
    relatedProjects: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string(),
    teamSize: z.string().optional(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    status: z.enum(["public", "private", "in-progress", "planned"]).default("in-progress"),
    featured: z.boolean().default(false),
    cover: coverSchema,
    links: z.array(linkSchema).default([]),
    highlights: z.array(z.string()).default([])
  })
});

export const collections = { posts, projects };
