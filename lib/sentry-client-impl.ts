// The only module that imports @sentry/nextjs on the client. It is reached
// through a dynamic import in lib/sentry-client.ts, so it ships as its own
// async chunk; the named imports (not `import * as`) let that chunk be
// tree-shaken down to what we call.
export { init, captureException, captureMessage } from "@sentry/nextjs";
