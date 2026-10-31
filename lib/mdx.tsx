/* eslint-disable react-hooks/static-components */
"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, type ComponentPropsWithoutRef } from "react";
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

const components = { a: TrackedLink };

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
