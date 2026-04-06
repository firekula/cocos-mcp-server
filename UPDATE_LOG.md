### 2026-04-06 (Docs Update)
- **Docs**: 全面清洗并同步了所有 Markdown 文档 (README、FEATURE_GUIDE)。
  - README：修正了工具数量与快速调用示例代码中针对工具名的过时引用。
  - FEATURE_GUIDE：利用 TS Node 脚本从 `mcp-server.ts` 和源码直接反向生成了 27 个最新多态工具及参数 Schema 配置，彻底杜绝了大模型查阅旧版文档时的幻觉与参数拼写错误。

### 2026-04-06 (Bug Fix)
- **Fix**: 修复了工具管理面板由于历史配置文件缓存导致的废除类目（由63项重构为27项后）展示残留的问题，为启动与导入步骤增加了与在线工具库的双向同步清洗（Sanitization）与过滤机制。

### v1.4.0 - 2025年7月26日（当前github版本）

#### 🎯 重大功能修复
- **完全修复预制体创建功能**: 彻底解决了预制体创建时组件/节点/资源类型引用丢失的问题
- **正确的引用处理**: 实现了与手动创建预制体完全一致的引用格式
  - **内部引用**: 预制体内部的节点和组件引用正确转换为 `{"__id__": x}` 格式
  - **外部引用**: 预制体外部的节点和组件引用正确设置为 `null`
  - **资源引用**: 预制体、纹理、精灵帧等资源引用完整保留UUID格式
- **组件/脚本移除API规范化**: 现在移除组件/脚本时，必须传入组件的cid（type字段），不能用脚本名或类名。AI和用户应先用getComponents获取type字段（cid），再传给removeComponent。这样能100%准确移除所有类型组件和脚本，兼容所有Cocos Creator版本。

#### 🔧 核心改进
- **索引顺序优化**: 调整预制体对象创建顺序，确保与Cocos Creator标准格式一致
- **组件类型支持**: 扩展组件引用检测，支持所有cc.开头的组件类型（Label、Button、Sprite等）
- **UUID映射机制**: 完善内部UUID到索引的映射系统，确保引用关系正确建立
- **属性格式标准化**: 修复组件属性顺序和格式，消除引擎解析错误

#### 🐛 错误修复
- **修复预制体导入错误**: 解决 `Cannot read properties of undefined (reading '_name')` 错误
- **修复引擎兼容性**: 解决 `placeHolder.initDefault is not a function` 错误
- **修复属性覆盖**: 防止 `_objFlags` 等关键属性被组件数据覆盖
- **修复引用丢失**: 确保所有类型的引用都能正确保存和加载

#### 📈 功能增强
- **完整组件属性保留**: 包括私有属性（如_group、_density等）在内的所有组件属性
- **子节点结构支持**: 正确处理预制体的层级结构和子节点关系
- **变换属性处理**: 保留节点的位置、旋转、缩放和层级信息
- **调试信息优化**: 添加详细的引用处理日志，便于问题追踪

#### 💡 技术突破
- **引用类型识别**: 智能区分内部引用和外部引用，避免无效引用
- **格式兼容性**: 生成的预制体与手动创建的预制体格式100%兼容
- **引擎集成**: 预制体可以正常挂载到场景中，无任何运行时错误
- **性能优化**: 优化预制体创建流程，提高大型预制体的处理效率

**🎉 现在预制体创建功能已完全可用，支持复杂的组件引用关系和完整的预制体结构！**

### v1.3.0 - 2024年7月25日

#### 🆕 新功能
- **集成工具管理面板**: 在主控制面板中直接添加了全面的工具管理功能
- **工具配置系统**: 实现了选择性工具启用/禁用，支持持久化配置
- **动态工具加载**: 增强了工具发现功能，能够动态加载MCP服务器中的所有158个可用工具
- **实时工具状态管理**: 添加了工具计数和状态的实时更新，当单个工具切换时立即反映
- **配置持久化**: 在编辑器会话间自动保存和加载工具配置

#### 🔧 改进
- **统一面板界面**: 将工具管理合并到主MCP服务器面板作为标签页，消除了对单独面板的需求
- **增强服务器设置**: 改进了服务器配置管理，具有更好的持久化和加载功能
- **Vue 3集成**: 升级到Vue 3 Composition API，提供更好的响应性和性能
- **更好的错误处理**: 添加了全面的错误处理，包含失败操作的回滚机制
- **改进的UI/UX**: 增强了视觉设计，包含适当的分隔符、独特的块样式和非透明模态背景

#### 🐛 错误修复
- **修复工具状态持久化**: 解决了工具状态在标签页切换或面板重新打开时重置的问题
- **修复配置加载**: 纠正了服务器设置加载问题和消息注册问题
- **修复复选框交互**: 解决了复选框取消选中问题并改进了响应性
- **修复面板滚动**: 确保工具管理面板中的正确滚动功能
- **修复IPC通信**: 解决了前端和后端之间的各种IPC通信问题

#### 🏗️ 技术改进
- **简化架构**: 移除了多配置复杂性，专注于单一配置管理
- **更好的类型安全**: 增强了TypeScript类型定义和接口
- **改进数据同步**: 前端UI状态和后端工具管理器之间更好的同步
- **增强调试**: 添加了全面的日志记录和调试功能

#### 📊 统计信息
- **总工具数**: 从151个增加到158个工具
- **类别**: 13个工具类别，全面覆盖
- **编辑器控制**: 实现98%的编辑器功能覆盖

### v1.2.0 - 之前版本
- 初始发布，包含151个工具
- 基本MCP服务器功能
- 场景、节点、组件和预制体操作
- 项目控制和调试工具

### 2026-04-06 (Docs Update)
- **Docs**: 全面清洗并同步了所有 Markdown 文档 (README、FEATURE_GUIDE) 中的错误日志、过期死链及不准确的工具数(涵盖由158删减汇聚对齐27工具的事实)。

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



---

## English Changelog

### v1.4.0 - July 26, 2025 (Current github version)

#### 🎯 Major Functionality Fixes
- **Complete Prefab Creation Fix**: Thoroughly resolved the issue of component/node/resource type reference loss during prefab creation
- **Proper Reference Handling**: Implemented reference formats completely consistent with manually created prefabs
  - **Internal References**: Node and component references within prefabs correctly converted to `{"__id__": x}` format
  - **External References**: Node and component references outside prefabs correctly set to `null`
  - **Resource References**: Prefab, texture, sprite frame and other resource references fully preserved in UUID format
- **Component/Script Removal API Standardization**: Now, when removing a component or script, you must provide the component's cid (type field), not the script name or class name. AI and users should first use getComponents to get the type field (cid), then pass it to removeComponent. This ensures 100% accurate removal of all component and script types, compatible with all Cocos Creator versions.

#### 🔧 Core Improvements
- **Index Order Optimization**: Adjusted prefab object creation order to ensure consistency with Cocos Creator standard format
- **Component Type Support**: Extended component reference detection to support all cc. prefixed component types (Label, Button, Sprite, etc.)
- **UUID Mapping Mechanism**: Perfected internal UUID to index mapping system, ensuring correct reference relationships
- **Property Format Standardization**: Fixed component property order and format, eliminating engine parsing errors

#### 🐛 Bug Fixes
- **Fixed Prefab Import Errors**: Resolved `Cannot read properties of undefined (reading '_name')` error
- **Fixed Engine Compatibility**: Resolved `placeHolder.initDefault is not a function` error
- **Fixed Property Overwriting**: Prevented critical properties like `_objFlags` from being overwritten by component data
- **Fixed Reference Loss**: Ensured all types of references are correctly saved and loaded

#### 📈 Feature Enhancements
- **Complete Component Property Preservation**: All component properties including private properties (like _group, _density, etc.)
- **Child Node Structure Support**: Proper handling of prefab hierarchical structures and child node relationships
- **Transform Property Processing**: Preserved node position, rotation, scale, and layer information
- **Debug Information Optimization**: Added detailed reference processing logs for easier issue tracking

#### 💡 Technical Breakthroughs
- **Reference Type Identification**: Intelligently distinguish between internal and external references, avoiding invalid references
- **Format Compatibility**: Generated prefabs are 100% compatible with manually created prefab formats
- **Engine Integration**: Prefabs can be properly mounted to scenes without any runtime errors
- **Performance Optimization**: Optimized prefab creation workflow, improving processing efficiency for large prefabs

**🎉 Prefab creation functionality is now fully operational, supporting complex component reference relationships and complete prefab structures!**

### v1.3.0 - July 25, 2024

#### 🆕 New Features
- **Integrated Tool Management Panel**: Added comprehensive tool management functionality directly into the main control panel
- **Tool Configuration System**: Implemented selective tool enabling/disabling with persistent configurations
- **Dynamic Tool Loading**: Enhanced tool discovery to dynamically load all 158 available tools from the MCP server
- **Real-time Tool State Management**: Added real-time updates for tool counts and status when individual tools are toggled
- **Configuration Persistence**: Automatic saving and loading of tool configurations across editor sessions

#### 🔧 Improvements
- **Unified Panel Interface**: Merged tool management into the main MCP server panel as a tab, eliminating the need for separate panels
- **Enhanced Server Settings**: Improved server configuration management with better persistence and loading
- **Vue 3 Integration**: Upgraded to Vue 3 Composition API for better reactivity and performance
- **Better Error Handling**: Added comprehensive error handling with rollback mechanisms for failed operations
- **Improved UI/UX**: Enhanced visual design with proper dividers, distinct block styles, and non-transparent modal backgrounds

#### 🐛 Bug Fixes
- **Fixed Tool State Persistence**: Resolved issues where tool states would reset upon tab switching or panel re-opening
- **Fixed Configuration Loading**: Corrected server settings loading issues and message registration problems
- **Fixed Checkbox Interactions**: Resolved checkbox unchecking issues and improved reactivity
- **Fixed Panel Scrolling**: Ensured proper scrolling functionality in the tool management panel
- **Fixed IPC Communication**: Resolved various IPC communication issues between frontend and backend

#### 🏗️ Technical Improvements
- **Simplified Architecture**: Removed multi-configuration complexity, focusing on single configuration management
- **Better Type Safety**: Enhanced TypeScript type definitions and interfaces
- **Improved Data Synchronization**: Better synchronization between frontend UI state and backend tool manager
- **Enhanced Debugging**: Added comprehensive logging and debugging capabilities

#### 📊 Statistics
- **Total Tools**: Increased from 151 to 158 tools
- **Categories**: 13 tool categories with comprehensive coverage
- **Editor Control**: Achieved 98% editor functionality coverage

### v1.2.0 - Previous Version
- Initial release with 151 tools
- Basic MCP server functionality
- Scene, node, component, and prefab operations
- Project control and debugging tools
