import React from "react";

type DocumentPageProps = {
  title: string;
  content: string;
};

type ContentBlock =
  | { type: "heading"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "list"; items: string[] };

const parseDocument = (content: string): ContentBlock[] => {
  const lines = content
    .replace(/\u00a0/g, " ")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const blocks: ContentBlock[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^\d+\.\s+/.test(line)) {
      blocks.push({ type: "heading", value: line });
      continue;
    }

    if (line.startsWith("•")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("•")) {
        items.push(lines[index].replace(/^•\s*/, ""));
        index += 1;
      }
      index -= 1;
      blocks.push({ type: "list", items });
      continue;
    }

    blocks.push({ type: "paragraph", value: line });
  }

  return blocks;
};

const DocumentPage = ({ title, content }: DocumentPageProps) => {
  const blocks = parseDocument(content);

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 text-primary-900 sm:px-8 sm:py-20 lg:py-24">
      <header className="mb-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      </header>

      <div className="text-base leading-8 text-primary-600">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={`${block.value}-${index}`}
                className="mb-4 mt-10 text-xl font-semibold text-primary-900 first:mt-0 sm:text-2xl"
              >
                {block.value}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={`list-${index}`}
                className="mb-4 list-disc space-y-2 pl-6 marker:text-secondary-500"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          const isLastUpdated = block.value.startsWith("Last Updated:");
          return (
            <p
              key={`${block.value}-${index}`}
              className={isLastUpdated ? "mb-8 text-sm font-medium text-primary-500" : "mb-4"}
            >
              {block.value}
            </p>
          );
        })}
      </div>
    </article>
  );
};

export default DocumentPage;
