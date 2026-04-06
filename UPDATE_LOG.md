### 2026-04-06 (Bug Fix)
- **Fix**: 修复了服务器首选项中“自动启动”与“调试日志”勾选后无法落盘生效的问题。
  - 通过替换 `v-model` 为 `@change` 事件解决了 WebComponent (`ui-checkbox`/`ui-num-input`) 事件双向绑定失效。
  - 修正了持久化 payload 参数 `debugLog` 的拼写错误，与后台类型结构 `enableDebugLog` 对齐。

### 2026-04-06
  - `scene_open_scene`: replaced `query-uuid` with `query-asset-info` and used returned uuid.
  - `prefab_load_prefab`: replaced deprecated/hallucinated `scene:load-asset` with `asset-db:open-asset`.
  - `prefab_validate_prefab`: replaced `asset-db:read-asset` with node `fs.readFileSync` file readout.
  - `debug_get_node_tree` & `debug_validate_scene`: replaced outdated `query-hierarchy` with `query-node-tree`, removed unavailable `check-missing-assets`.
  - `assetAdvanced_get_asset_dependencies`: implemented mapping `dependUuids` via `query-asset-info` data.

### 2026-04-06 (Tools Refactoring)
- **工具精简**：合并了 Node、Scene、Component 分支下的多个冗余工具调用，降低了总工具暴露数量。
  - `query_nodes` 代推了原先 3 个独立查询工具 (`get_all_nodes`, `find_nodes`, `find_node_by_name`)。
  - `update_node` 整合了普通属性和 Transform 的更新入口。
  - `create_node` 新增 `sourceUuid` 用于包罗 `duplicate_node`。
  - `get_current_scene` 包含是否导出层级树。
  - `save_scene` 统一通过参数判断是否另存为。
  - `get_components` 吸纳了只查询单一种类组件的 `get_component_info`。

### Continued (Stage 2 Refactoring)
- **极致工具精选**：剥离了 8 个非核心的高级与系统工具模块的源注册和配置追踪，并且深度精简了 `project-tools.ts`, `prefab-tools.ts` 和 `debug-tools.ts`，将所有冗余 API 压缩为基于 Action 分发的路由式大工具。
- **终极清洗盲区修复**：从 `mcp-server.ts` 底层实例化源头彻底移除了对 `validation`、`broadcast` 等 8 个非常规组件类的硬编码加载。修复了无配置文件时会Fallback退化暴露114个工具的问题。
- **卓越量级缩小**：当前完全重构后的工具总数已经史诗级下降突破预期，MCP 向 Editor / Cursor 等客户端呈现的真实高多态、原子级工具总量定格在了 **27 个**。极大缓解了大模型长时调用的上下文压力（Context Fatigue）与幻觉问题。
