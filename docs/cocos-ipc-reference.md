# Cocos Creator 官方 IPC 文档

> 来源：Cocos Creator 编辑器消息管理器（消息管理器）
> 整理时间：2026-04-06
> 用途：MCP 工具开发参考

---

## 目录

1. [project (项目模块)](#project-项目模块)
2. [preferences (偏好设置模块)](#preferences-偏好设置模块)
3. [asset-db (资源数据库)](#asset-db-资源数据库)
4. [scene (场景模块)](#scene-场景模块)
5. [server (服务器模块)](#server-服务器模块)
6. [builder (构建模块)](#builder-构建模块)
7. [reference-image (参考图模块)](#reference-image-参考图模块)
8. [Broadcast (广播消息)](#broadcast-广播消息)

---

## project (项目模块)

### open-settings - 打开项目设置面板

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 要打开的选项卡所属的插件注册名称 |
| tab | string | 注册功能面板时使用的键 |
| ...args | any[] | 打开选项卡时附带的其他参数 |

**返回值**: `null`

```javascript
await Editor.Message.request('project', 'open-settings');
```

---

### query-config - 查询项目配置

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 插件名 |
| path? | string | 配置路径 |
| type? | 'default' \| 'project' | 配置类型 |

**返回值**: `any` 返回配置数据

```javascript
await Editor.Message.request('project', 'query-config', 'engine', 'modules');
```

---

### set-config - 设置项目配置

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 插件名 |
| path | string | 配置路径 |
| value | any | 配置数据 |

**返回值**: `boolean` 设置成功与否

```javascript
await Editor.Message.request('project', 'set-config', 'project', 'general.downloadMaxConcurrency', 10);
```

---

## preferences (偏好设置模块)

### open-settings - 打开偏好设置面板

| 参数 | 类型 | 说明 |
|------|------|------|
| tab | string | 需要打开的选项卡（功能面板的名称） |
| ...args | any[] | 打开选项卡时携带的其他参数 |

**返回值**: `null`

```javascript
await Editor.Message.request('preferences', 'open-settings');
```

---

### query-config - 查询偏好配置

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 插件名或分类名 |
| path? | string | 配置路径 |
| type? | 'default' \| 'global' \| 'local' | 配置类型 |

**返回值**: `any` 返回配置数据

```javascript
await Editor.Message.request('preferences', 'query-config', 'preview', 'general', 'global'); // 复制
```

---

### set-config - 设置偏好配置

| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 插件名 |
| path | string | 配置路径 |
| value | any | 配置数据 |
| type? | 'default' \| 'global' \| 'local' | 配置类型 |

**返回值**: `boolean` 是否设置成功

```javascript
await Editor.Message.request('preferences', 'set-config', 'preview', 'general.auto_refresh', false, 'global');
```

---

## asset-db (资源数据库模块)

> ⚠️ 图片内容较长，以下为可见的主要消息接口：

### 基础操作

| 消息 | 描述 | 调用示例 |
|------|------|----------|
| `query-path` | 资源路径查询 | `Editor.Message.request('asset-db', 'query-path', uuid)` |
| `query-info` | 资源信息查询 | - |
| `create-asset` | 创建资源 | - |
| `delete-asset` | 删除资源 | - |
| `move-asset` | 移动资源 | - |
| `rename-asset` | 重命名资源 | - |
| `refresh` | 刷新资源库 | - |
| `import` | 导入资源 | - |
| `reimport` | 重新导入 | - |

### 资源查询

| 消息 | 描述 |
|------|------|
| `query-assets` | 查询资源列表（支持 type, url 等过滤条件） |
| `query-scene` | 查询场景信息 |
| `query-uuid` | 通过 URL 查询 UUID |
| `query-url` | 通过 UUID 查询 URL |

### 示例调用

```javascript
// 查询资源
await Editor.Message.request('asset-db', 'query-assets', { type: 'texture', url: 'db://' });

// 创建资源
await Editor.Message.request('asset-db', 'create-asset', 'image', data, url);
```

---

## scene (场景模块)

> ⚠️ 图片内容非常长，涵盖大量场景操作接口

### 场景基础操作

| 消息 | 描述 |
|------|------|
| `open-scene` | 打开场景 |
| `create-scene` | 创建新场景 |
| `save-scene` | 保存场景 |
| `close-scene` | 关闭场景 |
| `query-scene` | 查询当前场景信息 |

### 节点操作

| 消息 | 描述 | 参数说明 |
|------|------|----------|
| `create-node` | 创建节点 | parentUuid 必填 |
| `get-node-info` | 获取节点信息 | uuid: string |
| `find-node` | 按模式查找节点 | pattern: string |
| `find-node-by-name` | 按名称查找节点 | name: string |
| `get-nodes` | 获取所有节点 | 无参数 |
| `move-node` | 移动节点 | 需要新父节点 UUID |
| `duplicate-node` | 复制节点 | uuid: string |
| `delete-node` | 删除节点 | uuid: string |

### 节点属性操作

| 消息 | 描述 |
|------|------|
| `set-node-property` | 设置节点属性 |
| `set-node-transform` | 设置变换属性（位置/旋转/缩放） |
| `reset-node-transform` | 重置变换属性 |
| `reset-node-property` | 重置节点属性到默认值 |

### 组件操作

| 消息 | 描述 |
|------|------|
| `add-component` | 添加组件 |
| `remove-component` | 移除组件（需 cid） |
| `get-components` | 获取组件列表 |
| `get-component-info` | 获取组件详细信息 |
| `set-component-property` | 设置组件属性 |
| `attach-script` | 附加脚本 |
| `reset-component` | 重置组件默认值 |

### 高级操作

| 消息 | 描述 |
|------|------|
| `execute-component-method` | 执行组件方法 |
| `execute-scene-script` | 执行场景脚本 |
| `scene-snapshot` | 场景快照 |
| `begin-undo-recording` | 开始撤销记录 |
| `end-undo-recording` | 结束撤销记录 |
| `cancel-undo-recording` | 取消撤销记录 |
| `soft-reload-scene` | 软重载场景 |

### 查询类

| 消息 | 描述 |
|------|------|
| `query-hierarchy` | 查询层级结构 |
| `query-ready` | 场景是否就绪 |
| `query-dirty` | 是否有未保存修改 |
| `query-classes` | 查询已注册的类 |
| `query-components` | 查询可用组件 |
| `component-has-script` | 组件是否有脚本 |
| `nodes-by-uuid` | 通过资产UUID查找节点 |

### 示例调用

```javascript
// 创建节点
await Editor.Message.request('scene', 'create-node', { name: 'NewNode', parentUuid: 'xxx' });

// 获取所有节点
await Editor.Message.request('scene', 'get-nodes');

// 设置位置
await Editor.Message.request('scene', 'set-node-transform', {
    uuid: 'xxx',
    position: { x: 0, y: 0, z: 0 }
});
```

---

## server (服务器模块)

### query-ip-list - 查询 IP 列表

**返回值**: `string[]` IP 列表

```javascript
await Editor.Message.request('server', 'query-ip-list');
```

---

### query-sort-ip-list - 获取排序后的 IP 列表

**返回值**: `string[]` 排序后的 IP 列表

```javascript
await Editor.Message.request('server', 'query-sort-ip-list');
```

---

### query-port - 查询编辑器服务器当前启动的端口号

**返回值**: `number` 端口号

```javascript
await Editor.Message.request('server', 'query-port');
```

---

## builder (构建模块)

### open - 打开构建面板

**返回值**: `null`

```javascript
await Editor.Message.request('builder', 'open');
```

---

### query-worker-ready - 查询构建进程是否启动好

**返回值**: `boolean` 构建进程是否准备就绪

```javascript
await Editor.Message.request('builder', 'query-worker-ready');
```

---

## reference-image (参考图模块)

### add-image - 添加参考图

| 参数 | 类型 | 说明 |
|------|------|------|
| paths | string[] | 参考图资源绝对路径数组 |

```javascript
await Editor.Message.request('reference-image', 'add-image', paths);
```

---

### remove-image - 删除参考图

| 参数 | 类型 | 说明 |
|------|------|------|
| paths | string[] | 参考图资源绝对路径（可选）如果不填，删除当前的参考图 |

```javascript
await Editor.Message.request('reference-image', 'remove-image', paths);
```

---

### switch-image - 切换参考图

| 参数 | 类型 | 说明 |
|------|------|------|
| path | string | 参考图资源绝对路径 |
| specifySceneUUID | string | 指定场景 UUID（可选） |

```javascript
await Editor.Message.request('reference-image', 'switch-image', path);
```

---

### set-image-data - 设置参考图数据

| 参数 | 类型 | 说明 |
|------|------|------|
| key | string | 参考图数据参数 |
| o.path | string | 参考图绝对路径 |
| o.x | number | x 偏移 |
| o.y | number | y 偏移 |
| o.sx | number | x 缩放 |
| o.sy | number | y 缩放 |
| opacity | number | 参考图透明度 |

```javascript
await Editor.Message.request('reference-image', 'set-image-data', 'x', 10);
```

---

### query-config - 请求参考图配置

**返回值**: `IReference[]`

```javascript
await Editor.Message.request('reference-image', 'query-config');
```

---

### query-current - 请求当前参考图数据

**返回值**: `IImageData`

```javascript
await Editor.Message.request('reference-image', 'query-current');
```

---

### refresh - 刷新参考图

```javascript
await Editor.Message.request('reference-image', 'refresh');
```

---

## Broadcast (广播消息)

> 编辑器会主动推送的事件消息，可使用 `Editor.Message.broadcast()` 发送，`Editor.Message.on()` 监听

---

### asset-db (资产数据库广播)

#### asset-db:ready - 资源数据库准备就绪时的广播

```javascript
Editor.Message.broadcast('asset-db:ready');
```

---

#### asset-db:close - 资源数据库关闭时的广播

```javascript
Editor.Message.broadcast('asset-db:close');
```

---

#### asset-db:asset-add - 当资源数据库准备就绪后，再新增资源时的广播

```javascript
Editor.Message.broadcast('asset-db:asset-add');
```

---

#### asset-db:asset-change - 当一个资源被修改时的广播

```javascript
Editor.Message.broadcast('asset-db:asset-change');
```

---

#### asset-db:asset-delete - 当一个资源被删除时的广播

```javascript
Editor.Message.broadcast('asset-db:asset-delete');
```

---

### scene (场景广播)

#### scene:ready - 场景打开通知

**参数**:
- `uuid` (string): uuid of scene（场景的 UUID）

```javascript
Editor.Message.broadcast('scene:ready', assetUuid);
```

---

#### scene:close - 场景关闭通知

```javascript
Editor.Message.broadcast('scene:close');
```

---

#### scene:light-probe-edit-mode-changed - 光照探针编辑模式切换通知

**参数**:
- `mode` (boolean): 切换后的探针编辑模式

```javascript
Editor.Message.broadcast('scene:light-probe-edit-mode-changed', true);
```

---

#### scene:light-probe-bounding-box-edit-mode-changed - 光照探针组件包围盒编辑模式切换通知

**参数**:
- `mode` (boolean): 切换后的探针组件包围盒编辑模式

```javascript
Editor.Message.broadcast('scene:light-probe-bounding-box-edit-mode-changed', true);
```

---

### builder (构建广播)

#### build-worker:ready - 构建进程启动

```javascript
Editor.Message.broadcast('build-worker:ready');
```

---

#### build-worker:closed - 构建进程关闭

```javascript
Editor.Message.broadcast('build-worker:closed');
```

---

### 完整监听示例

```javascript
// ========== 资产数据库相关监听 ==========

// 监听资产数据库准备就绪
Editor.Message.on('asset-db:ready', () => {
    console.log('Asset database is ready');
});

// 监听资产数据库关闭
Editor.Message.on('asset-db:close', () => {
    console.log('Asset database closed');
});

// 监听新增资源
Editor.Message.on('asset-db:asset-add', () => {
    console.log('New asset added');
});

// 监听资源修改
Editor.Message.on('asset-db:asset-change', () => {
    console.log('Asset modified');
});

// 监听资源删除
Editor.Message.on('asset-db:asset-delete', () => {
    console.log('Asset deleted');
});

// ========== 场景相关监听 ==========

// 监听场景打开（携带场景 UUID）
Editor.Message.on('scene:ready', (uuid) => {
    console.log('Scene opened:', uuid);
});

// 监听场景关闭
Editor.Message.on('scene:close', () => {
    console.log('Scene closed');
});

// 监听光照探针编辑模式切换
Editor.Message.on('scene:light-probe-edit-mode-changed', (mode) => {
    console.log('Light probe edit mode:', mode);
});

// 监听光照探针包围盒编辑模式切换
Editor.Message.on('scene:light-probe-bounding-box-edit-mode-changed', (mode) => {
    console.log('Light probe bounding box edit mode:', mode);
});

// ========== 构建相关监听 ==========

// 监听构建进程启动
Editor.Message.on('build-worker:ready', () => {
    console.log('Build worker started');
});

// 监听构建进程关闭
Editor.Message.on('build-worker:closed', () => {
    console.log('Build worker closed');
});
```

---

### 广播消息汇总表

| 模块 | 消息名称 | 描述 | 参数 |
|------|----------|------|------|
| **asset-db** | `asset-db:ready` | 资源库准备就绪 | 无 |
| **asset-db** | `asset-db:close` | 资源库关闭 | 无 |
| **asset-db** | `asset-db:asset-add` | 新增资源 | 无 |
| **asset-db** | `asset-db:asset-change` | 资源被修改 | 无 |
| **asset-db** | `asset-db:asset-delete` | 资源被删除 | 无 |
| **scene** | `scene:ready` | 场景打开 | uuid (string) |
| **scene** | `scene:close` | 场景关闭 | 无 |
| **scene** | `scene:light-probe-edit-mode-changed` | 光照探针编辑模式切换 | mode (boolean) |
| **scene** | `scene:light-probe-bounding-box-edit-mode-changed` | 探针包围盒编辑模式切换 | mode (boolean) |
| **builder** | `build-worker:ready` | 构建进程启动 | 无 |
| **builder** | `build-worker:closed` | 构建进程关闭 | 无 |

---

## 附录：通用调用格式

所有 IPC 消息都通过 `Editor.Message.request()` 或 `Editor.Message.send()` 进行通信：

```javascript
// Request 模式（等待返回值）
const result = await Editor.Message.request(moduleName, messageName, ...params);

// Send 模式（不等待返回）
Editor.Message.send(moduleName, messageName, ...params);

// 发送广播消息
Editor.Message.broadcast(broadcastMessageName, ...params);

// 监听广播消息
Editor.Message.on(broadcastMessageName, callback);
Editor.Message.off(broadcastMessageName, callback);
```

---

*文档整理自 Cocos Creator 官方消息管理器界面截图*
