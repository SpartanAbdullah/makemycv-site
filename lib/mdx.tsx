/* eslint-disable react-hooks/static-components */
"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ComponentPropsWithoutRef } from "react";
import { HUMAN_REVIEW_ON } from "@/lib/features";
import { inlineCtaAttrs } from "@/lib/inline-cta";

function useMDXComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
}

/**
 * Every `<a>` an article body renders. Links to a product surface (the app,
 * /resume-checker, /jd-match, the calculators, ...) get the `cta_click`
 * data-* attributes the delegated dispatcher in app/layout.tsx forwards to
 * the GTM dataLayer; blog-to-blog and external links render as a plain <a>.
 * The attributes are set at render time, so they are in the server-rendered
 * HTML rather than patched in after hydration.
 */
export function TrackedLink(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} {...inlineCtaAttrs(props.href)} />;
}

/**
 * Disclosed mention of our own paid review inside an article. Renders nothing
 * while NEXT_PUBLIC_HUMAN_REVIEW is off, so a post never links to a 404.
 */
export function HumanReviewNote() {
  if (!HUMAN_REVIEW_ON) return null;
  return (
    <p>
      <em>
        Disclosure: MakeMyCV also offers its own paid{" "}
        <a
          href="/human-cv-review"
          data-event="cta_click"
          data-cta-id="human_review_blog"
          data-cta-location="blog_inline"
        >
          human CV review, from AED 79
        </a>
        . It is a review of the CV you wrote, not a writing service, and it is separate from the
        free builder.
      </em>
    </p>
  );
}

const components = { a: TrackedLink, HumanReviewNote };

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
