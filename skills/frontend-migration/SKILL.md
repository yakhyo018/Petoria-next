---
name: frontend-migration
description: Continue the nestar-next to Petoria-next frontend migration while preserving the current Next.js + Apollo architecture. Use when renaming, removing or adding frontend domain concepts (Property → Product leftovers, Agent → Seller UI, filters, i18n, assets) or when updating the migration docs in ../Petoria/docs/ai.
---

# Petoria Frontend Migration

## Before Editing

1. Read `CLAUDE.md`, then `../Petoria/docs/ai/FRONTEND_MIGRATION.md`, `BACKEND_MIGRATION.md`, `DECISIONS.md`, `COMPLETED_TASKS.md`, `NEXT_STEPS.md`.
2. Work on the `modification` branch. Check `git status` is clean or understood.
3. Make sure the backend is running on `http://localhost:3007/graphql`.
4. Pick the task from `NEXT_STEPS.md` (Frontend Migration) and state the plan (files, renames, UI changes) before changing code.

## Current State (keep in sync with ../Petoria/docs/ai)

- Branding, `Property` → `Product`, Agent → Seller (UI only) and pet-shop copy are done.
- Apollo documents in `apollo/user/*` and `apollo/admin/*` match the Petoria API (`getProduct(productId)`, `getProducts`, `getAgentProducts`, `createProduct`, `likeTargetProduct(productId)`, admin product ops, `memberProducts`).
- GraphQL `getAgents`, `getAgentProducts`, `AgentsInquiry` and `MemberType.AGENT` stay unchanged (backend decision D7). Only labels, routes (`/seller`) and component names say Seller.
- Remaining work: raster assets, seeded-data QA, `productGender` for non-pet products.

## Rules

- Keep the pages router, `withLayout*` HOCs, Apollo `useQuery`/`useMutation` pattern, MUI + SCSS styling and next-i18next.
- Types and enums live in `libs/types/*` and `libs/enums/*` and must mirror the backend DTOs in `../Petoria/apps/petoria-api/src/libs`.
- Rename with `git mv`. Never delete and re-create a file just to rename it.
- A rename must cover every layer in one change: Apollo document, type, enum, component/page file, import paths, routes and links (`router.push`, `Link href`), SCSS file and class names, i18n keys in `public/locales/{en,kr,ru}/common.json`.
- Never reintroduce `property*` names or real-estate fields (address, square, beds, rooms, barter, rent, constructedAt) or "Nestar" text.
- `productGender` is shown only when `productType === ProductType.PET`, but the add/edit form always sends it (backend field is NN).
- Do not rewrite `CHANGELOG.md`.

## Leftover Sweep

```bash
grep -rniE "propert|nestar|apartment|villa|bedroom|square meter|barter|for rent|constructedAt" libs pages apollo scss public/locales
```

The expected result is no matches.

## Validation

```bash
npx tsc --noEmit -p .
yarn build
```

- Validate all Apollo documents against the live schema: introspect `http://localhost:3007/graphql` and run `graphql.validate` on every `gql` document in `apollo/**`. Expect 0 invalid.
- Runtime check: `yarn dev`, open `/`, `/product`, `/product/detail`, `/seller`, `/mypage`, `/_admin/products` and check the console and GraphQL responses for errors.
- If `yarn dev` shows "missing required error components", delete `.next` (left over from `yarn build`) and restart.

## Finish

- Update `../Petoria/docs/ai/COMPLETED_TASKS.md` (Frontend Migration section and validation table), `FRONTEND_MIGRATION.md` status and `NEXT_STEPS.md`.
- Commit with the project style (`feat: ...`, `fix: ...`) and push `modification`.
