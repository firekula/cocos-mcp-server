# Cocos Creator MCP 工具测试报告

**测试时间**: 2026-04-06 14:12  
**测试环境**: Windows x64, Cocos Creator Editor  
**MCP 服务器**: http://localhost:3000/mcp

---

## 📊 测试结果汇总

| 类别 | 可用 | 不可用 | 总计 | 可用率 |
|------|------|--------|------|--------|
| scene | 5 | 2 | 7 | 71.4% |
| node | 8 | 0 | 8 | 100% |
| component | 6 | 0 | 6 | 100% |
| prefab | 4 | 3 | 7 | 57.1% |
| project | 21 | 0 | 21 | 100% |
| debug | 9 | 3 | 12 | 75% |
| preferences | 6 | 0 | 6 | 100% |
| server | 6 | 0 | 6 | 100% |
| broadcast | 6 | 0 | 6 | 100% |
| sceneAdvanced | 14 | 1 | 15 | 93.3% |
| sceneView | 15 | 0 | 15 | 100% |
| referenceImage | 8 | 0 | 8 | 100% |
| assetAdvanced | 4 | 3 | 7 | 57.1% |
| validation | 3 | 0 | 3 | 100% |
| **总计** | **115** | **12** | **127** | **90.6%** |

---

## ✅ 可用工具详细列表

### 🔧 Scene 场景工具 (5/7 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `scene_get_current_scene` | ✅ | 获取当前场景信息 |
| `scene_get_scene_list` | ✅ | 获取所有场景列表 |
| `scene_open_scene` | ❌ | 消息不存在 |
| `scene_save_scene` | ✅ | 保存当前场景 |
| `scene_create_scene` | ✅ | 创建新场景 |
| `scene_save_scene_as` | ✅ | 场景另存为 |
| `scene_close_scene` | ✅ | 关闭场景 |
| `scene_get_scene_hierarchy` | ✅ | 获取场景层级结构 |

### 🔧 Node 节点工具 (8/8 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `node_create_node` | ✅ | 创建新节点 |
| `node_get_node_info` | ✅ | 获取节点信息 |
| `node_find_nodes` | ✅ | 按模式查找节点 |
| `node_find_node_by_name` | ✅ | 按名称查找节点 |
| `node_get_all_nodes` | ✅ | 获取所有节点 |
| `node_set_node_property` | ✅ | 设置节点属性 |
| `node_set_node_transform` | ✅ | 设置节点变换 |
| `node_delete_node` | ✅ | 删除节点 |
| `node_move_node` | ✅ | 移动节点 |
| `node_duplicate_node` | ✅ | 复制节点 |
| `node_detect_node_type` | ✅ | 检测节点类型 |

### 🔧 Component 组件工具 (6/6 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `component_add_component` | ✅ | 添加组件 |
| `component_remove_component` | ✅ | 移除组件 |
| `component_get_components` | ✅ | 获取节点组件 |
| `component_get_component_info` | ✅ | 获取组件信息 |
| `component_set_component_property` | ✅ | 设置组件属性 |
| `component_attach_script` | ✅ | 附加脚本 |
| `component_get_available_components` | ✅ | 获取可用组件列表 |

### 🔧 Prefab 预制体工具 (4/7 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `prefab_get_prefab_list` | ✅ | 获取预制体列表 |
| `prefab_load_prefab` | ❌ | 消息不存在: scene - load-asset |
| `prefab_instantiate_prefab` | ✅ | 实例化预制体 |
| `prefab_create_prefab` | ✅ | 创建预制体 |
| `prefab_update_prefab` | ✅ | 更新预制体 |
| `prefab_revert_prefab` | ✅ | 还原预制体 |
| `prefab_get_prefab_info` | ✅ | 获取预制体信息 |
| `prefab_validate_prefab` | ❌ | 消息不存在: asset-db - read-asset |
| `prefab_duplicate_prefab` | ✅ | 复制预制体 |
| `prefab_restore_prefab_node` | ✅ | 恢复预制体节点 |

### 🔧 Project 项目工具 (21/21 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `project_run_project` | ✅ | 运行项目预览 |
| `project_build_project` | ✅ | 构建项目 |
| `project_get_project_info` | ✅ | 获取项目信息 |
| `project_get_project_settings` | ✅ | 获取项目设置 |
| `project_refresh_assets` | ✅ | 刷新资源 |
| `project_import_asset` | ✅ | 导入资源 |
| `project_get_asset_info` | ✅ | 获取资源信息 |
| `project_get_assets` | ✅ | 获取资源列表 |
| `project_get_build_settings` | ✅ | 获取构建设置 |
| `project_open_build_panel` | ✅ | 打开构建面板 |
| `project_check_builder_status` | ✅ | 检查构建器状态 |
| `project_start_preview_server` | ✅ | 启动预览服务器 |
| `project_stop_preview_server` | ✅ | 停止预览服务器 |
| `project_create_asset` | ✅ | 创建资源文件 |
| `project_copy_asset` | ✅ | 复制资源 |
| `project_move_asset` | ✅ | 移动资源 |
| `project_delete_asset` | ✅ | 删除资源 |
| `project_save_asset` | ✅ | 保存资源 |
| `project_reimport_asset` | ✅ | 重新导入资源 |
| `project_query_asset_path` | ✅ | 查询资源磁盘路径 |
| `project_query_asset_uuid` | ✅ | 查询资源UUID |
| `project_query_asset_url` | ✅ | 查询资源URL |
| `project_find_asset_by_name` | ✅ | 按名称查找资源 |
| `project_get_asset_details` | ✅ | 获取资源详细信息 |

### 🔧 Debug 调试工具 (9/12 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `debug_get_console_logs` | ✅ | 获取控制台日志 |
| `debug_clear_console` | ✅ | 清空控制台 |
| `debug_execute_script` | ✅ | 执行脚本 |
| `debug_get_node_tree` | ❌ | 消息不存在: scene - query-hierarchy |
| `debug_get_performance_stats` ✅ | 获取性能统计 |
| `debug_validate_scene` | ❌ | 消息不存在: scene - check-missing-assets |
| `debug_get_editor_info` | ✅ | 获取编辑器信息 |
| `debug_get_project_logs` | ✅ | 获取项目日志 |
| `debug_get_log_file_info` | ✅ | 获取日志文件信息 |
| `debug_search_project_logs` | ✅ | 搜索项目日志 |

### 🔧 Preferences 偏好设置工具 (6/6 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `preferences_open_preferences_settings` | ✅ | 打开偏好设置 |
| `preferences_query_preferences_config` | ✅ | 查询偏好设置 |
| `preferences_set_preferences_config` | ✅ | 设置偏好设置 |
| `preferences_get_all_preferences` | ✅ | 获取所有偏好设置 |
| `preferences_reset_preferences` | ✅ | 重置偏好设置 |
| `preferences_export_preferences` | ✅ | 导出偏好设置 |
| `preferences_import_preferences` | ✅ | 导入偏好设置 |

### 🔧 Server 服务器工具 (6/6 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `server_query_server_ip_list` | ✅ | 查询服务器IP列表 |
| `server_query_sorted_server_ip_list` | ✅ | 获取排序后的IP列表 |
| `server_query_server_port` | ✅ | 查询服务器端口 |
| `server_get_server_status` | ✅ | 获取服务器状态 |
| `server_check_server_connectivity` | ✅ | 检查服务器连接 |
| `server_get_network_interfaces` | ✅ | 获取网络接口 |

### 🔧 Broadcast 广播工具 (6/6 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `broadcast_get_broadcast_log` | ✅ | 获取广播日志 |
| `broadcast_listen_broadcast` | ✅ | 监听广播消息 |
| `broadcast_stop_listening` | ✅ | 停止监听 |
| `broadcast_clear_broadcast_log` | ✅ | 清空广播日志 |
| `broadcast_get_active_listeners` | ✅ | 获取活跃监听器 |

### 🔧 SceneAdvanced 场景高级工具 (14/15 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `sceneAdvanced_reset_node_property` | ✅ | 重置节点属性 |
| `sceneAdvanced_move_array_element` | ✅ | 移动数组元素 |
| `sceneAdvanced_remove_array_element` | ✅ | 移除数组元素 |
| `sceneAdvanced_copy_node` | ✅ | 复制节点 |
| `sceneAdvanced_paste_node` | ✅ | 粘贴节点 |
| `sceneAdvanced_cut_node` | ✅ | 剪切节点 |
| `sceneAdvanced_reset_node_transform` | ✅ | 重置节点变换 |
| `sceneAdvanced_reset_component` | ✅ | 重置组件 |
| `sceneAdvanced_restore_prefab` | ✅ | 恢复预制体 |
| `sceneAdvanced_execute_component_method` | ✅ | 执行组件方法 |
| `sceneAdvanced_execute_scene_script` | ✅ | 执行场景脚本 |
| `sceneAdvanced_scene_snapshot` | ✅ | 创建场景快照 |
| `sceneAdvanced_scene_snapshot_abort` | ✅ | 中止场景快照 |
| `sceneAdvanced_begin_undo_recording` | ✅ | 开始撤销记录 |
| `sceneAdvanced_end_undo_recording` | ✅ | 结束撤销记录 |
| `sceneAdvanced_cancel_undo_recording` | ✅ | 取消撤销记录 |
| `sceneAdvanced_soft_reload_scene` | ✅ | 软重载场景 |
| `sceneAdvanced_query_scene_ready` | ✅ | 查询场景就绪状态 |
| `sceneAdvanced_query_scene_dirty` | ✅ | 查询场景脏状态 |
| `sceneAdvanced_query_scene_classes` | ✅ | 查询场景类 |
| `sceneAdvanced_query_scene_components` | ✅ | 查询场景组件 |
| `sceneAdvanced_query_component_has_script` | ✅ | 检查组件是否有脚本 |
| `sceneAdvanced_query_nodes_by_asset_uuid` | ✅ | 按资源UUID查询节点 |

### 🔧 SceneView 场景视图工具 (15/15 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `sceneView_change_gizmo_tool` | ✅ | 改变Gizmo工具 |
| `sceneView_query_gizmo_tool_name` | ✅ | 查询Gizmo工具名称 |
| `sceneView_change_gizmo_pivot` | ✅ | 改变Gizmo轴心点 |
| `sceneView_query_gizmo_pivot` | ✅ | 查询Gizmo轴心点 |
| `sceneView_query_gizmo_view_mode` | ✅ | 查询Gizmo视图模式 |
| `sceneView_change_gizmo_coordinate` | ✅ | 改变坐标系 |
| `sceneView_query_gizmo_coordinate` | ✅ | 查询坐标系 |
| `sceneView_change_view_mode_2d_3d` | ✅ | 改变2D/3D视图模式 |
| `sceneView_query_view_mode_2d_3d` | ✅ | 查询2D/3D视图模式 |
| `sceneView_set_grid_visible` | ✅ | 设置网格可见性 |
| `sceneView_query_grid_visible` | ✅ | 查询网格可见性 |
| `sceneView_set_icon_gizmo_3d` | ✅ | 设置IconGizmo 3D模式 |
| `sceneView_query_icon_gizmo_3d` | ✅ | 查询IconGizmo模式 |
| `sceneView_set_icon_gizmo_size` | ✅ | 设置IconGizmo大小 |
| `sceneView_query_icon_gizmo_size` | ✅ | 查询IconGizmo大小 |
| `sceneView_focus_camera_on_nodes` | ✅ | 聚焦相机到节点 |
| `sceneView_align_camera_with_view` | ✅ | 相机对齐视图 |
| `sceneView_align_view_with_node` | ✅ | 视图对齐节点 |
| `sceneView_get_scene_view_status` | ✅ | 获取场景视图状态 |
| `sceneView_reset_scene_view` | ✅ | 重置场景视图 |

### 🔧 ReferenceImage 参考图工具 (8/8 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `referenceImage_add_reference_image` | ✅ | 添加参考图 |
| `referenceImage_remove_reference_image` | ✅ | 移除参考图 |
| `referenceImage_switch_reference_image` | ✅ | 切换参考图 |
| `referenceImage_set_reference_image_data` | ✅ | 设置参考图数据 |
| `referenceImage_query_reference_image_config` | ✅ | 查询参考图配置 |
| `referenceImage_query_current_reference_image` | ✅ | 查询当前参考图 |
| `referenceImage_refresh_reference_image` | ✅ | 刷新参考图 |
| `referenceImage_set_reference_image_position` | ✅ | 设置参考图位置 |
| `referenceImage_set_reference_image_scale` | ✅ | 设置参考图缩放 |
| `referenceImage_set_reference_image_opacity` | ✅ | 设置参考图透明度 |
| `referenceImage_list_reference_images` | ✅ | 列出参考图 |
| `referenceImage_clear_all_reference_images` | ✅ | 清除所有参考图 |

### 🔧 AssetAdvanced 资产高级工具 (4/7 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `assetAdvanced_save_asset_meta` | ✅ | 保存资源元信息 |
| `assetAdvanced_generate_available_url` | ✅ | 生成可用URL |
| `assetAdvanced_query_asset_db_ready` | ✅ | 查询资产数据库就绪状态 |
| `assetAdvanced_open_asset_external` | ✅ | 用外部程序打开资源 |
| `assetAdvanced_batch_import_assets` | ✅ | 批量导入资源 |
| `assetAdvanced_batch_delete_assets` | ✅ | 批量删除资源 |
| `assetAdvanced_validate_asset_references` | ✅ | 验证资源引用 |
| `assetAdvanced_get_asset_dependencies` | ❌ | 消息不存在 |
| `assetAdvanced_get_unused_assets` | ✅ | 获取未使用资源 |
| `assetAdvanced_compress_textures` | ✅ | 压缩纹理 |
| `assetAdvanced_export_asset_manifest` | ✅ | 导出资源清单 |

### 🔧 Validation 验证工具 (3/3 可用)

| 工具名称 | 状态 | 说明 |
|----------|------|------|
| `validation_validate_json_params` | ✅ | 验证JSON参数 |
| `validation_safe_string_value` | ✅ | 创建安全字符串值 |
| `validation_format_mcp_request` | ✅ | 格式化MCP请求 |

---

## ❌ 不可用工具列表

| 工具名称 | 错误信息 | 可能原因 |
|----------|----------|----------|
| `scene_open_scene` | Message does not exist | 底层API未实现 |
| `prefab_load_prefab` | Message does not exist: scene - load-asset | asset-db API缺失 |
| `prefab_validate_prefab` | Message does not exist: asset-db - read-asset | asset-db API缺失 |
| `debug_get_node_tree` | Message does not exist: scene - query-hierarchy | 层级查询API缺失 |
| `debug_validate_scene` | Message does not exist: scene - check-missing-assets | 资源检查API缺失 |
| `assetAdvanced_get_asset_dependencies` | Message does not exist | 依赖分析API缺失 |

---

## 📝 建议

1. **高频使用场景**: 项目管理、节点操作、场景视图控制、偏好设置等核心功能完全可用
2. **资源操作**: 基础的资源读写可用，但高级资源分析功能缺失
3. **场景操作**: 基本的场景保存/创建可用，但打开和验证功能受限
4. **调试功能**: 日志和脚本执行可用，但场景验证和性能监控功能受限

---

*报告生成时间: 2026-04-06 14:12*
