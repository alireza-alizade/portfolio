const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image: string | null;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: number;
  icon: string;
  proficiency: number;
  order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  order: number;
  skills: Skill[];
}

export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  published_at: string | null;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date_obtained: string;
  url: string;
  icon: string;
  order: number;
}

export interface Post extends PostListItem {
  content_markdown: string;
  created_at: string;
  updated_at: string;
}

export function getProjects() {
  return fetchAPI<{ results: Project[] }>("/projects/");
}

export function getProject(slug: string) {
  return fetchAPI<Project>(`/projects/${slug}/`);
}

export function getSkills() {
  return fetchAPI<{ results: SkillCategory[] }>("/skills/");
}

export function getCertificates() {
  return fetchAPI<{ results: Certificate[] }>("/certificates/");
}

export function getPosts() {
  return fetchAPI<{ results: PostListItem[] }>("/blog/");
}

export function getPost(slug: string) {
  return fetchAPI<Post>(`/blog/${slug}/`);
}

export function getTags() {
  return fetchAPI<string[]>("/blog/tags/");
}

export function submitContact(data: { name: string; email: string; subject: string; message: string }) {
  return fetchAPI<{ id: number }>("/contact/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
