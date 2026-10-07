Go outside of this project and read `../Petoria/docs/ai` first!

# Petoria Frontend Modification Instructions

This client project is being migrated from nestar-next to petoria-next.

## Rules

- Preserve current project architecture
- Keep GraphQL/Apollo integration
- Do not rewrite the whole app
- Improve UI incrementally

## Backend Context

Before making any changes, read (paths relative to this repo):

- `../Petoria/docs/ai/BACKEND_MIGRATION.md`
- `../Petoria/docs/ai/DECISIONS.md`
- `../Petoria/docs/ai/FRONTEND_MIGRATION.md`
- and the other files inside `../Petoria/docs/ai` (`COMPLETED_TASKS.md`, `NEXT_STEPS.md`, `PROMPTS.md`)

## Workflow

1. Analyze before editing.
2. Backend is running on port http://localhost:3007/graphql now.
3. Make small incremental changes.
4. Run typecheck after each phase.
5. Do not remove working logic unless replaced safely.
6. Update `../Petoria/docs/ai/COMPLETED_TASKS.md` after major changes.

## Package Manager

- Use Yarn for all frontend commands.
- Do not use npm or pnpm.
- Install dependencies with:

```bash
yarn install
```

## Skills

Reusable workflows: `skills/frontend-migration/SKILL.md`, `skills/product-ui/SKILL.md`, `skills/user-project/SKILL.md`, `skills/admin-project/SKILL.md` (see `SKILLS.md`).
