#!/usr/bin/env node
/**
 * Checker-count drift check (Mission 8, 2026-10-31) — `npm run check:checklist`.
 *
 * The app serves its checker checklist as JSON:
 *   GET https://app.makemycv.ae/api/resume-checker/checklist
 *   { version: 1, count, categories: [{ id, label, count, items: [...] }] }
 * This site states the same numbers statically in lib/checkerChecklist.ts
 * (rendered on /resume-checker, no build-time fetch — SEO copy must not depend
 * on the app being up). This script is the only link between the two: it
 * fetches the endpoint and fails (exit 1) when the live counts differ from the
 * site's constants.
 *
 * Runs under `tsx` so it can import the TypeScript constants module directly —
 * one source, no duplicated numbers in the script.
 *
 * Behaviour:
 *   - 200 + matching numbers            → exit 0 ("ok")
 *   - 200 + any mismatch                → exit 1, each difference listed
 *   - non-200 (e.g. 404 while the route is only on staging) → exit 0,
 *     prints "skipped: endpoint <status>" so CI stays green until it ships
 *   - network error / invalid JSON      → exit 1 (the CI job is non-blocking)
 *
 * Override the URL with CHECKLIST_URL, e.g. against a local app dev server:
 *   CHECKLIST_URL=http://localhost:3700/api/resume-checker/checklist npm run check:checklist
 */
import {
  CHECKLIST_ENDPOINT,
  CHECKLIST_CONTRACT_VERSION,
  CHECK_COUNT,
  CHECK_COUNT_COPY_FLOOR,
  CHECK_FAMILY_TOTAL,
  checkFamilies,
} from "../lib/checkerChecklist.ts";

const url = process.env.CHECKLIST_URL || CHECKLIST_ENDPOINT;
const TIMEOUT_MS = 15_000;

function fail(lines) {
  console.error("check-checklist-contract: FAIL");
  for (const l of lines) console.error("  - " + l);
  console.error(
    "\nUpdate lib/checkerChecklist.ts (counts AND item wording) from the app's\n" +
      "lib/resumeChecker/checklist.ts, then re-run `npm run check:checklist`.",
  );
  process.exitCode = 1;
}

// Internal consistency first — catches a half-edited constants module even
// when the endpoint is unreachable.
const local = [];
if (CHECK_FAMILY_TOTAL !== CHECK_COUNT) {
  local.push(`site: family counts sum to ${CHECK_FAMILY_TOTAL} but CHECK_COUNT is ${CHECK_COUNT}`);
}
if (CHECK_COUNT < CHECK_COUNT_COPY_FLOOR) {
  local.push(`site: CHECK_COUNT ${CHECK_COUNT} is below the "${CHECK_COUNT_COPY_FLOOR}+" copy floor`);
}
if (local.length) {
  fail(local);
} else {
  await checkRemote();
}

// Everything below runs inside a function so every return path lets Node
// finish the fetch's streams and exit on its own with process.exitCode.
// process.exit() with an undrained response body trips a libuv assertion on
// Windows (seen on the 404 path, 2026-10-31).
async function checkRemote() {
  let res;
  try {
    res = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    console.error(`check-checklist-contract: could not reach ${url}: ${err?.message ?? err}`);
    process.exitCode = 1;
    return;
  }

  if (res.status !== 200) {
    await res.text().catch(() => undefined); // drain so the socket closes cleanly
    console.log(`check-checklist-contract: skipped: endpoint ${res.status} (${url})`);
    return;
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error(`check-checklist-contract: ${url} did not return JSON: ${err?.message ?? err}`);
    process.exitCode = 1;
    return;
  }

  const problems = [];

  if (data?.version !== CHECKLIST_CONTRACT_VERSION) {
    problems.push(
      `payload version ${JSON.stringify(data?.version)} — this script understands version ${CHECKLIST_CONTRACT_VERSION}; update the script and lib/checkerChecklist.ts together`,
    );
  }

  if (typeof data?.count !== "number") {
    problems.push(`payload has no numeric "count" (got ${JSON.stringify(data?.count)})`);
  } else {
    if (data.count !== CHECK_COUNT) {
      problems.push(`total: app says ${data.count} checks, site says ${CHECK_COUNT}`);
    }
    if (data.count < CHECK_COUNT_COPY_FLOOR) {
      problems.push(
        `app count ${data.count} is below the "${CHECK_COUNT_COPY_FLOOR}+" copy floor — the "40+ UAE-tuned checks" wording has to change everywhere it appears (grep "40+")`,
      );
    }
  }

  const remote = Array.isArray(data?.categories) ? data.categories : [];
  const remoteById = new Map(remote.map((c) => [c.id, c]));
  const localIds = checkFamilies.map((f) => f.id);
  const remoteIds = remote.map((c) => c.id);

  for (const f of checkFamilies) {
    const r = remoteById.get(f.id);
    if (!r) {
      problems.push(`category "${f.id}" is on the site but not in the app payload`);
    } else if (r.count !== f.count) {
      problems.push(`category "${f.id}": app says ${r.count} checks, site says ${f.count}`);
    }
  }
  for (const id of remoteIds) {
    if (!localIds.includes(id)) problems.push(`category "${id}" is in the app payload but not on the site`);
  }
  const remoteSum = remote.reduce((s, c) => s + (typeof c.count === "number" ? c.count : 0), 0);
  if (remote.length && typeof data?.count === "number" && remoteSum !== data.count) {
    problems.push(`app payload is inconsistent: categories sum to ${remoteSum}, count is ${data.count}`);
  }

  if (problems.length) {
    fail(problems);
    return;
  }

  console.log(
    `check-checklist-contract: ok — ${data.count} checks in ${remote.length} categories ` +
      `(${remote.map((c) => `${c.id} ${c.count}`).join(", ")}) match lib/checkerChecklist.ts (${url})`,
  );
}
