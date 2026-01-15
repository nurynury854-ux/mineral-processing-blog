"use client";

import { useEffect, useState } from "react";
import type { PostMetadata } from "@/types/post";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostMetadata[]>([]);

  useEffect(() => {
    if (!query) return;

    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]);

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {results.map(post => (
        <div key={post.slug}>{post.title}</div>
      ))}
    </>
  );
}
