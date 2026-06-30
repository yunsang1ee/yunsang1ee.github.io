export const site = {
  title: "Behind the Frame",
  subtitle: "Graphics / Engine / AI for Graphics",
  authorKo: "이윤상",
  authorEn: "YunSangLee",
  description:
    "Real-Time & Photorealistic Graphics를 중심으로 rendering pipeline, engine architecture, GPU work, AI for Graphics를 기록하는 기술 블로그입니다.",
  github: "https://github.com/yunsang1ee",
  email: "kwjdduf88@gmail.com"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog/" },
  { label: "Topics", href: "/categories/" },
  { label: "Projects", href: "/projects/" },
  { label: "Series", href: "/series/blog-start/" },
  { label: "About", href: "/about/" }
] as const;

export const categories = [
  {
    title: "Graphics Programming",
    slug: "graphics-programming",
    summary:
      "DirectX 12, DXR, Path Tracing, PBR, ReSTIR, GPU Debugging처럼 real-time graphics programming과 직접 맞닿은 내용을 다룹니다.",
    topics: ["DirectX 12", "DXR", "Path Tracing", "PBR", "ReSTIR", "GPU Debugging"],
    accent: "green"
  },
  {
    title: "Engine / Framework Architecture",
    slug: "engine-framework-architecture",
    summary:
      "game client framework, rendering runtime, engine architecture, tool integration을 구현 관점에서 정리합니다.",
    topics: ["Client Framework", "Rendering Runtime", "Architecture", "Tooling"],
    accent: "blue"
  },
  {
    title: "AI for Graphics",
    slug: "ai-for-graphics",
    summary:
      "Neural Rendering, Inverse Rendering, Image Processing, Photorealistic AI, 3DGS처럼 graphics와 직접 연결되는 AI 기술을 다룹니다.",
    topics: ["Neural Rendering", "Inverse Rendering", "3DGS", "Vision", "LLM/RAG"],
    accent: "rust"
  },
  {
    title: "Dev Process & Knowledge System",
    slug: "dev-process-knowledge-system",
    summary:
      "GitHub, PR, CI, technical writing, debugging workflow, RAG 기반 second brain처럼 개발 과정을 축적하는 방식을 정리합니다.",
    topics: ["RAG", "Second Brain", "CI", "Documentation", "Debugging"],
    accent: "slate"
  },
  {
    title: "CS Fundamentals",
    slug: "cs-fundamentals",
    summary:
      "자료구조, 알고리듬, computer architecture, OS처럼 graphics engineer에게도 오래 남는 CS 기반을 기록합니다.",
    topics: ["Data Structures", "Algorithms", "Computer Architecture", "OS"],
    accent: "violet"
  },
  {
    title: "Miscellaneous",
    slug: "miscellaneous",
    summary: "아직 명확히 분류하기 어렵거나 짧게 남겨둘 기술 기록, 생각, 실험적인 메모를 모읍니다.",
    topics: ["Memo", "Reflection", "Short Notes"],
    accent: "gray"
  }
] as const;

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]));
