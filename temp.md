### 2026-04-06
- **Fix**: Updated core tool IPC messaging to resolve API hallucination errors.
  - \scene_open_scene\: replaced \query-uuid\ with \query-asset-info\ and used returned uuid.
  - \prefab_load_prefab\: replaced deprecated/hallucinated \scene:load-asset\ with \sset-db:open-asset\.
  - \prefab_validate_prefab\: replaced \sset-db:read-asset\ with node \s\ file readout.
  - \debug_get_node_tree\ / \debug_validate_scene\: replaced outdated \query-hierarchy\ with \query-node-tree\, removed unavailable \check-missing-assets\.
  - \ssetAdvanced_get_asset_dependencies\: implemented mapping \dependUuids\ via \query-asset-info\.

