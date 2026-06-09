/**
 * Server-only JSON-LD emitter.
 *
 * Pass any plain object (or an array of objects). It will be JSON.stringified
 * and rendered as <script type="application/ld+json">. Slashes inside the
 * payload are escaped so a stray "</script>" sequence inside data can't
 * close our script tag.
 *
 * Always rendered server-side (no client hooks) so search and AI crawlers
 * receive the schema in the initial HTML response.
 */
type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

type Props = {
  data: JsonLdValue;
};

function safeStringify(data: JsonLdValue): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  );
}
