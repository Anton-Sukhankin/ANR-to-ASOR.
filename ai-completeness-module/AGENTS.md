# Project Instructions For Codex

## UI + Docs

When changing UI, behavior, mock data, statuses, selectors, or user flows, follow `docs/ui_docs_sync_workflow.md`.

Use `docs/component_registry.json` to find the documentation connected to the changed component.

Before finishing a UI task:

1. Review the component's `primary_docs`.
2. Review relevant `conditional_docs`.
3. Update documentation when the change affects the documented structure, behavior, data contract, status logic, selectors, or user journey.
4. In the final response, state which docs were updated or that docs were checked and did not need changes.

Optional helper:

```bash
node scripts/docs-sync-check.js <changed-file> [changed-file...]
```
