"use client";

import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
