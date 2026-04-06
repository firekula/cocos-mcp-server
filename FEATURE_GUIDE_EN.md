# Cocos Creator MCP Server Feature Guide

## Tool Categories

The MCP server has been refactored and streamlined, currently providing **27 highly polymorphic core tools** clustered by core features. The previous redundant atomic tool methods have been entirely removed or merged.

## SCENE Tools

### scene_get_current_scene
Get current scene information and optionally its hierarchy

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "includeHierarchy": {
      "type": "boolean",
      "description": "Include the full node hierarchy of the scene",
      "default": false
    },
    "includeComponents": {
      "type": "boolean",
      "description": "Include component information (only works if includeHierarchy is true)",
      "default": false
    }
  }
}
```

### scene_get_scene_list
Get all scenes in the project

**Parameters:**
```json
{
  "type": "object",
  "properties": {}
}
```

### scene_open_scene
Open a scene by path

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "scenePath": {
      "type": "string",
      "description": "The scene file path"
    }
  },
  "required": [
    "scenePath"
  ]
}
```

### scene_save_scene
Save current scene. If path is provided, performs save as.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "path": {
      "type": "string",
      "description": "Optional path to save as new file. Leave empty to just save current scene."
    }
  }
}
```

### scene_create_scene
Create a new scene asset

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "sceneName": {
      "type": "string",
      "description": "Name of the new scene"
    },
    "savePath": {
      "type": "string",
      "description": "Path to save the scene (e.g., db://assets/scenes/NewScene.scene)"
    }
  },
  "required": [
    "sceneName",
    "savePath"
  ]
}
```

### scene_close_scene
Close current scene

**Parameters:**
```json
{
  "type": "object",
  "properties": {}
}
```

## NODE Tools

### node_create_node
Create a new node in the scene. Supports creating empty nodes, nodes with components, or instantiating from assets (prefabs, etc.). IMPORTANT: You should always provide parentUuid to specify where to create the node.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Node name (optional if sourceUuid is provided for duplication)"
    },
    "parentUuid": {
      "type": "string",
      "description": "Parent node UUID. STRONGLY RECOMMENDED: Always provide this parameter. Use get_current_scene or get_all_nodes to find parent UUIDs. If not provided, node will be created at scene root."
    },
    "sourceUuid": {
      "type": "string",
      "description": "Source node UUID to duplicate. If provided, will duplicate this node instead of creating a new one."
    },
    "nodeType": {
      "type": "string",
      "description": "Node type: Node, 2DNode, 3DNode",
      "enum": [
        "Node",
        "2DNode",
        "3DNode"
      ],
      "default": "Node"
    },
    "siblingIndex": {
      "type": "number",
      "description": "Sibling index for ordering (-1 means append at end)",
      "default": -1
    },
    "assetUuid": {
      "type": "string",
      "description": "Asset UUID to instantiate from (e.g., prefab UUID). When provided, creates a node instance from the asset instead of an empty node."
    },
    "assetPath": {
      "type": "string",
      "description": "Asset path to instantiate from (e.g., \"db://assets/prefabs/MyPrefab.prefab\"). Alternative to assetUuid."
    },
    "components": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of component type names to add to the new node (e.g., [\"cc.Sprite\", \"cc.Button\"])"
    },
    "unlinkPrefab": {
      "type": "boolean",
      "description": "If true and creating from prefab, unlink from prefab to create a regular node",
      "default": false
    },
    "keepWorldTransform": {
      "type": "boolean",
      "description": "Whether to keep world transform when creating the node",
      "default": false
    },
    "initialTransform": {
      "type": "object",
      "properties": {
        "position": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        },
        "rotation": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        },
        "scale": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        }
      },
      "description": "Initial transform to apply to the created node"
    }
  },
  "required": [
    "name"
  ]
}
```

### node_get_node_info
Get node information by UUID

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Node UUID"
    }
  },
  "required": [
    "uuid"
  ]
}
```

### node_query_nodes
Find nodes by pattern, exact name, or get all nodes if no pattern is provided

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "pattern": {
      "type": "string",
      "description": "Name pattern or exact name"
    },
    "exactMatch": {
      "type": "boolean",
      "description": "Exact match or partial match",
      "default": false
    },
    "firstMatchOnly": {
      "type": "boolean",
      "description": "Only return the first match (like old find_node_by_name)",
      "default": false
    }
  }
}
```

### node_update_node
Update node properties and/or transformations

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Node UUID"
    },
    "property": {
      "type": "string",
      "description": "Property name (e.g., active, name, layer)"
    },
    "value": {
      "description": "Property value"
    },
    "transform": {
      "type": "object",
      "description": "Transform properties to update",
      "properties": {
        "position": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        },
        "rotation": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        },
        "scale": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "z": {
              "type": "number"
            }
          }
        }
      }
    }
  },
  "required": [
    "uuid"
  ]
}
```

### node_delete_node
Delete a node from scene

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Node UUID to delete"
    }
  },
  "required": [
    "uuid"
  ]
}
```

### node_move_node
Move node to new parent

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Node UUID to move"
    },
    "newParentUuid": {
      "type": "string",
      "description": "New parent node UUID"
    },
    "siblingIndex": {
      "type": "number",
      "description": "Sibling index in new parent",
      "default": -1
    }
  },
  "required": [
    "nodeUuid",
    "newParentUuid"
  ]
}
```

### node_detect_node_type
Detect if a node is 2D or 3D based on its components and properties

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Node UUID to analyze"
    }
  },
  "required": [
    "uuid"
  ]
}
```

## COMPONENT Tools

### component_add_component
Add a component to a specific node. IMPORTANT: You must provide the nodeUuid parameter to specify which node to add the component to.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Target node UUID. REQUIRED: You must specify the exact node to add the component to. Use get_all_nodes or find_node_by_name to get the UUID of the desired node."
    },
    "componentType": {
      "type": "string",
      "description": "Component type (e.g., cc.Sprite, cc.Label, cc.Button)"
    }
  },
  "required": [
    "nodeUuid",
    "componentType"
  ]
}
```

### component_remove_component
Remove a component from a node. componentType must be the component's classId (cid, i.e. the type field from getComponents), not the script name or class name. Use getComponents to get the correct cid.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Node UUID"
    },
    "componentType": {
      "type": "string",
      "description": "Component cid (type field from getComponents). Do NOT use script name or class name. Example: \"cc.Sprite\" or \"9b4a7ueT9xD6aRE+AlOusy1\""
    }
  },
  "required": [
    "nodeUuid",
    "componentType"
  ]
}
```

### component_get_components
Get component(s) of a node. If componentType is provided, gets specific component info, otherwise gets all components.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Node UUID"
    },
    "componentType": {
      "type": "string",
      "description": "Optional. Specific component type to get info for"
    }
  },
  "required": [
    "nodeUuid"
  ]
}
```

### component_set_component_property
Set component property values for UI components or custom script components. Supports setting properties of built-in UI components (e.g., cc.Label, cc.Sprite) and custom script components. Note: For node basic properties (name, active, layer, etc.), use set_node_property. For node transform properties (position, rotation, scale, etc.), use set_node_transform.

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Target node UUID - Must specify the node to operate on"
    },
    "componentType": {
      "type": "string",
      "description": "Component type - Can be built-in components (e.g., cc.Label) or custom script components (e.g., MyScript). If unsure about component type, use get_components first to retrieve all components on the node."
    },
    "property": {
      "type": "string",
      "description": "Property name - The property to set. Common properties include:\n• cc.Label: string (text content), fontSize (font size), color (text color)\n• cc.Sprite: spriteFrame (sprite frame), color (tint color), sizeMode (size mode)\n• cc.Button: normalColor (normal color), pressedColor (pressed color), target (target node)\n• cc.UITransform: contentSize (content size), anchorPoint (anchor point)\n• Custom Scripts: Based on properties defined in the script"
    },
    "propertyType": {
      "type": "string",
      "description": "Property type - Must explicitly specify the property data type for correct value conversion and validation",
      "enum": [
        "string",
        "number",
        "boolean",
        "integer",
        "float",
        "color",
        "vec2",
        "vec3",
        "size",
        "node",
        "component",
        "spriteFrame",
        "prefab",
        "asset",
        "nodeArray",
        "colorArray",
        "numberArray",
        "stringArray"
      ]
    },
    "value": {
      "description": "Property value - Use the corresponding data format based on propertyType:\n\n📝 Basic Data Types:\n• string: \"Hello World\" (text string)\n• number/integer/float: 42 or 3.14 (numeric value)\n• boolean: true or false (boolean value)\n\n🎨 Color Type:\n• color: {\"r\":255,\"g\":0,\"b\":0,\"a\":255} (RGBA values, range 0-255)\n  - Alternative: \"#FF0000\" (hexadecimal format)\n  - Transparency: a value controls opacity, 255 = fully opaque, 0 = fully transparent\n\n📐 Vector and Size Types:\n• vec2: {\"x\":100,\"y\":50} (2D vector)\n• vec3: {\"x\":1,\"y\":2,\"z\":3} (3D vector)\n• size: {\"width\":100,\"height\":50} (size dimensions)\n\n🔗 Reference Types (using UUID strings):\n• node: \"target-node-uuid\" (node reference)\n  How to get: Use get_all_nodes or find_node_by_name to get node UUIDs\n• component: \"target-node-uuid\" (component reference)\n  How it works: \n    1. Provide the UUID of the NODE that contains the target component\n    2. System auto-detects required component type from property metadata\n    3. Finds the component on target node and gets its scene __id__\n    4. Sets reference using the scene __id__ (not node UUID)\n  Example: value=\"label-node-uuid\" will find cc.Label and use its scene ID\n• spriteFrame: \"spriteframe-uuid\" (sprite frame asset)\n  How to get: Check asset database or use asset browser\n• prefab: \"prefab-uuid\" (prefab asset)\n  How to get: Check asset database or use asset browser\n• asset: \"asset-uuid\" (generic asset reference)\n  How to get: Check asset database or use asset browser\n\n📋 Array Types:\n• nodeArray: [\"uuid1\",\"uuid2\"] (array of node UUIDs)\n• colorArray: [{\"r\":255,\"g\":0,\"b\":0,\"a\":255}] (array of colors)\n• numberArray: [1,2,3,4,5] (array of numbers)\n• stringArray: [\"item1\",\"item2\"] (array of strings)"
    }
  },
  "required": [
    "nodeUuid",
    "componentType",
    "property",
    "propertyType",
    "value"
  ]
}
```

### component_attach_script
Attach a script component to a node

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "nodeUuid": {
      "type": "string",
      "description": "Node UUID"
    },
    "scriptPath": {
      "type": "string",
      "description": "Script asset path (e.g., db://assets/scripts/MyScript.ts)"
    }
  },
  "required": [
    "nodeUuid",
    "scriptPath"
  ]
}
```

### component_get_available_components
Get list of available component types

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "description": "Component category filter",
      "enum": [
        "all",
        "renderer",
        "ui",
        "physics",
        "animation",
        "audio"
      ],
      "default": "all"
    }
  }
}
```

## PREFAB Tools

### prefab_query_prefabs
Query, list, load, or validate prefabs

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "list",
        "load",
        "info",
        "validate"
      ]
    },
    "prefabPath": {
      "type": "string",
      "description": "Path to prefab (or folder if action=list)",
      "default": "db://assets"
    }
  },
  "required": [
    "action"
  ]
}
```

### prefab_manage_prefab
Create, instantiate, update, duplicate or restore prefabs

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "instantiate",
        "create",
        "update",
        "revert",
        "duplicate",
        "restore"
      ]
    },
    "prefabPath": {
      "type": "string",
      "description": "Source prefab path"
    },
    "targetPath": {
      "type": "string",
      "description": "Target prefab path (for duplicate)"
    },
    "nodeUuid": {
      "type": "string",
      "description": "Node UUID for create/update/revert/restore"
    },
    "parentUuid": {
      "type": "string",
      "description": "Parent UUID for instantiate"
    },
    "position": {
      "type": "object"
    },
    "prefabName": {
      "type": "string"
    },
    "assetUuid": {
      "type": "string"
    }
  },
  "required": [
    "action"
  ]
}
```

## PROJECT Tools

### project_query_assets
Query asset information by path, uuid, url, or get all assets

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "target": {
      "type": "string",
      "description": "Search term or exact uuid/path"
    },
    "queryType": {
      "type": "string",
      "enum": [
        "info",
        "details",
        "path",
        "uuid",
        "url",
        "find_by_name",
        "get_all"
      ],
      "default": "get_all"
    },
    "assetType": {
      "type": "string",
      "default": "all"
    },
    "folder": {
      "type": "string",
      "default": "db://assets"
    }
  }
}
```

### project_manage_assets
Unified tool to create, copy, move, delete, import, reimport, or save assets

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "create",
        "copy",
        "move",
        "delete",
        "save",
        "import",
        "reimport"
      ]
    },
    "sourceUrl": {
      "type": "string"
    },
    "targetUrl": {
      "type": "string"
    },
    "content": {
      "type": "string"
    }
  },
  "required": [
    "action"
  ]
}
```

### project_manage_build
Manage project building and preview servers

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "run",
        "build",
        "get_settings",
        "open_panel",
        "check_status",
        "start_preview",
        "stop_preview"
      ]
    },
    "platform": {
      "type": "string",
      "default": "browser"
    }
  },
  "required": [
    "action"
  ]
}
```

### project_project_info_utils
Get project info, settings, or refresh assets

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "get_info",
        "get_settings",
        "refresh_assets"
      ]
    },
    "settingCategory": {
      "type": "string",
      "default": "general"
    }
  },
  "required": [
    "action"
  ]
}
```

## DEBUG Tools

### debug_debug_project_logs
Get, search, or clear project/console logs

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "get_console",
        "clear_console",
        "get_project_logs",
        "get_log_info",
        "search_project_logs"
      ]
    },
    "limitOrLines": {
      "type": "number",
      "default": 100
    },
    "filterOrPattern": {
      "type": "string"
    },
    "logLevel": {
      "type": "string",
      "default": "ALL"
    }
  },
  "required": [
    "action"
  ]
}
```

### debug_debug_scene_state
Debug scene state, performance, node tree, and execute scripts

**Parameters:**
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "execute_script",
        "get_node_tree",
        "get_performance",
        "validate_scene",
        "get_editor_info"
      ]
    },
    "script": {
      "type": "string"
    },
    "rootUuid": {
      "type": "string"
    },
    "maxDepth": {
      "type": "number",
      "default": 10
    }
  },
  "required": [
    "action"
  ]
}
```

