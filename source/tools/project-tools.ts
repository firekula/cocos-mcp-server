import { ToolDefinition, ToolResponse, ToolExecutor, ProjectInfo, AssetInfo } from '../types';
import * as fs from 'fs';
import * as path from 'path';

export class ProjectTools implements ToolExecutor {
            getTools(): ToolDefinition[] {
        return [
            {
                name: 'query_assets',
                description: 'Query asset information by path, uuid, url, or get all assets',
                inputSchema: {
                    type: 'object',
                    properties: {
                        target: { type: 'string', description: 'Search term or exact uuid/path' },
                        queryType: { type: 'string', enum: ['info', 'details', 'path', 'uuid', 'url', 'find_by_name', 'get_all'], default: 'get_all' },
                        assetType: { type: 'string', default: 'all' },
                        folder: { type: 'string', default: 'db://assets' }
                    }
                }
            },
            {
                name: 'manage_assets',
                description: 'Unified tool to create, copy, move, delete, import, reimport, or save assets',
                inputSchema: {
                    type: 'object',
                    properties: {
                        action: { type: 'string', enum: ['create', 'copy', 'move', 'delete', 'save', 'import', 'reimport'] },
                        sourceUrl: { type: 'string' },
                        targetUrl: { type: 'string' },
                        content: { type: 'string' }
                    },
                    required: ['action']
                }
            },
            {
                name: 'manage_build',
                description: 'Manage project building and preview servers',
                inputSchema: {
                    type: 'object',
                    properties: {
                        action: { type: 'string', enum: ['run', 'build', 'get_settings', 'open_panel', 'check_status', 'start_preview', 'stop_preview'] },
                        platform: { type: 'string', default: 'browser' }
                    },
                    required: ['action']
                }
            },
            {
                name: 'project_info_utils',
                description: 'Get project info, settings, or refresh assets',
                inputSchema: {
                    type: 'object',
                    properties: {
                        action: { type: 'string', enum: ['get_info', 'get_settings', 'refresh_assets'] },
                        settingCategory: { type: 'string', default: 'general' }
                    },
                    required: ['action']
                }
            }
        ];
    }

    async execute(toolName: string, args: any): Promise<ToolResponse> {
        switch (toolName) {
            case 'query_assets':
                switch (args.queryType) {
                    case 'info': return await this.getAssetInfo(args.target);
                    case 'details': return await this.getAssetDetails(args.target, true);
                    case 'path': return await this.queryAssetPath(args.target);
                    case 'uuid': return await this.queryAssetUuid(args.target);
                    case 'url': return await this.queryAssetUrl(args.target);
                    case 'find_by_name': return await this.findAssetByName({name: args.target, exactMatch: false, assetType: args.assetType || 'all', folder: args.folder || 'db://assets', maxResults: 20});
                    case 'get_all': 
                    default: return await this.getAssets(args.assetType || 'all', args.folder || 'db://assets');
                }
            case 'manage_assets':
                switch (args.action) {
                    case 'create': return await this.createAsset(args.targetUrl, args.content, false);
                    case 'copy': return await this.copyAsset(args.sourceUrl, args.targetUrl, false);
                    case 'move': return await this.moveAsset(args.sourceUrl, args.targetUrl, false);
                    case 'delete': return await this.deleteAsset(args.targetUrl);
                    case 'save': return await this.saveAsset(args.targetUrl, args.content);
                    case 'import': return await this.importAsset(args.sourceUrl, args.targetUrl);
                    case 'reimport': return await this.reimportAsset(args.targetUrl);
                    default: throw new Error('Invalid action for manage_assets');
                }
            case 'manage_build':
                switch (args.action) {
                    case 'run': return await this.runProject(args.platform);
                    case 'build': return await this.buildProject({platform: args.platform, debug: true});
                    case 'get_settings': return await this.getBuildSettings();
                    case 'open_panel': return await this.openBuildPanel();
                    case 'check_status': return await this.checkBuilderStatus();
                    case 'start_preview': return await this.startPreviewServer(7456);
                    case 'stop_preview': return await this.stopPreviewServer();
                    default: throw new Error('Invalid action for manage_build');
                }
            case 'project_info_utils':
                switch (args.action) {
                    case 'get_info': return await this.getProjectInfo();
                    case 'get_settings': return await this.getProjectSettings(args.settingCategory);
                    case 'refresh_assets': return await this.refreshAssets(args.settingCategory === 'general' ? undefined : args.settingCategory);
                    default: throw new Error('Invalid action');
                }
            default:
                throw new Error(`Unknown tool: ${toolName}`);
        }
    }





    private async runProject(platform: string = 'browser'): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const previewConfig = {
                platform: platform,
                scenes: [] // Will use current scene
            };

            // Note: Preview module is not documented in official API
            // Using fallback approach - open build panel as alternative
            Editor.Message.request('builder', 'open').then(() => {
                resolve({
                    success: true,
                    message: `Build panel opened. Preview functionality requires manual setup.`
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async buildProject(args: any): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const buildOptions = {
                platform: args.platform,
                debug: args.debug !== false,
                sourceMaps: args.debug !== false,
                buildPath: `build/${args.platform}`
            };

            // Note: Builder module only supports 'open' and 'query-worker-ready'
            // Building requires manual interaction through the build panel
            Editor.Message.request('builder', 'open').then(() => {
                resolve({
                    success: true,
                    message: `Build panel opened for ${args.platform}. Please configure and start build manually.`,
                    data: { 
                        platform: args.platform,
                        instruction: "Use the build panel to configure and start the build process"
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async getProjectInfo(): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const info: ProjectInfo = {
                name: Editor.Project.name,
                path: Editor.Project.path,
                uuid: Editor.Project.uuid,
                version: (Editor.Project as any).version || '1.0.0',
                cocosVersion: (Editor as any).versions?.cocos || 'Unknown'
            };

            // Note: 'query-info' API doesn't exist, using 'query-config' instead
            Editor.Message.request('project', 'query-config', 'project').then((additionalInfo: any) => {
                if (additionalInfo) {
                    Object.assign(info, { config: additionalInfo });
                }
                resolve({ success: true, data: info });
            }).catch(() => {
                // Return basic info even if detailed query fails
                resolve({ success: true, data: info });
            });
        });
    }

    private async getProjectSettings(category: string = 'general'): Promise<ToolResponse> {
        return new Promise((resolve) => {
            // 使用正确的 project API 查询项目配置
            const configMap: Record<string, string> = {
                general: 'project',
                physics: 'physics',
                render: 'render',
                assets: 'asset-db'
            };

            const configName = configMap[category] || 'project';

            Editor.Message.request('project', 'query-config', configName).then((settings: any) => {
                resolve({
                    success: true,
                    data: {
                        category: category,
                        config: settings,
                        message: `${category} settings retrieved successfully`
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async refreshAssets(folder?: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            // 使用正确的 asset-db API 刷新资源
            const targetPath = folder || 'db://assets';
            
            Editor.Message.request('asset-db', 'refresh-asset', targetPath).then(() => {
                resolve({
                    success: true,
                    message: `Assets refreshed in: ${targetPath}`
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async importAsset(sourcePath: string, targetFolder: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            if (!fs.existsSync(sourcePath)) {
                resolve({ success: false, error: 'Source file not found' });
                return;
            }

            const fileName = path.basename(sourcePath);
            const targetPath = targetFolder.startsWith('db://') ?
                targetFolder : `db://assets/${targetFolder}`;

            Editor.Message.request('asset-db', 'import-asset', sourcePath, `${targetPath}/${fileName}`).then((result: any) => {
                resolve({
                    success: true,
                    data: {
                        uuid: result.uuid,
                        path: result.url,
                        message: `Asset imported: ${fileName}`
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async getAssetInfo(assetPath: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'query-asset-info', assetPath).then((assetInfo: any) => {
                if (!assetInfo) {
                    throw new Error('Asset not found');
                }

                const info: AssetInfo = {
                    name: assetInfo.name,
                    uuid: assetInfo.uuid,
                    path: assetInfo.url,
                    type: assetInfo.type,
                    size: assetInfo.size,
                    isDirectory: assetInfo.isDirectory
                };

                if (assetInfo.meta) {
                    info.meta = {
                        ver: assetInfo.meta.ver,
                        importer: assetInfo.meta.importer
                    };
                }

                resolve({ success: true, data: info });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async getAssets(type: string = 'all', folder: string = 'db://assets'): Promise<ToolResponse> {
        return new Promise((resolve) => {
            let pattern = `${folder}/**/*`;
            
            // 添加类型过滤
            if (type !== 'all') {
                const typeExtensions: Record<string, string> = {
                    'scene': '.scene',
                    'prefab': '.prefab',
                    'script': '.{ts,js}',
                    'texture': '.{png,jpg,jpeg,gif,tga,bmp,psd}',
                    'material': '.mtl',
                    'mesh': '.{fbx,obj,dae}',
                    'audio': '.{mp3,ogg,wav,m4a}',
                    'animation': '.{anim,clip}'
                };
                
                const extension = typeExtensions[type];
                if (extension) {
                    pattern = `${folder}/**/*${extension}`;
                }
            }

            // Note: query-assets API parameters corrected based on documentation
            Editor.Message.request('asset-db', 'query-assets', { pattern: pattern }).then((results: any[]) => {
                const assets = results.map(asset => ({
                    name: asset.name,
                    uuid: asset.uuid,
                    path: asset.url,
                    type: asset.type,
                    size: asset.size || 0,
                    isDirectory: asset.isDirectory || false
                }));
                
                resolve({ 
                    success: true, 
                    data: {
                        type: type,
                        folder: folder,
                        count: assets.length,
                        assets: assets
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async getBuildSettings(): Promise<ToolResponse> {
        return new Promise((resolve) => {
            // 检查构建器是否准备就绪
            Editor.Message.request('builder', 'query-worker-ready').then((ready: boolean) => {
                resolve({
                    success: true,
                    data: {
                        builderReady: ready,
                        message: 'Build settings are limited in MCP plugin environment',
                        availableActions: [
                            'Open build panel with open_build_panel',
                            'Check builder status with check_builder_status',
                            'Start preview server with start_preview_server',
                            'Stop preview server with stop_preview_server'
                        ],
                        limitation: 'Full build configuration requires direct Editor UI access'
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async openBuildPanel(): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('builder', 'open').then(() => {
                resolve({
                    success: true,
                    message: 'Build panel opened successfully'
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async checkBuilderStatus(): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('builder', 'query-worker-ready').then((ready: boolean) => {
                resolve({
                    success: true,
                    data: {
                        ready: ready,
                        status: ready ? 'Builder worker is ready' : 'Builder worker is not ready',
                        message: 'Builder status checked successfully'
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async startPreviewServer(port: number = 7456): Promise<ToolResponse> {
        return new Promise((resolve) => {
            resolve({
                success: false,
                error: 'Preview server control is not supported through MCP API',
                instruction: 'Please start the preview server manually using the editor menu: Project > Preview, or use the preview panel in the editor'
            });
        });
    }

    private async stopPreviewServer(): Promise<ToolResponse> {
        return new Promise((resolve) => {
            resolve({
                success: false,
                error: 'Preview server control is not supported through MCP API',
                instruction: 'Please stop the preview server manually using the preview panel in the editor'
            });
        });
    }

    private async createAsset(url: string, content: string | null = null, overwrite: boolean = false): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const options = {
                overwrite: overwrite,
                rename: !overwrite
            };

            Editor.Message.request('asset-db', 'create-asset', url, content, options).then((result: any) => {
                if (result && result.uuid) {
                    resolve({
                        success: true,
                        data: {
                            uuid: result.uuid,
                            url: result.url,
                            message: content === null ? 'Folder created successfully' : 'File created successfully'
                        }
                    });
                } else {
                    resolve({
                        success: true,
                        data: {
                            url: url,
                            message: content === null ? 'Folder created successfully' : 'File created successfully'
                        }
                    });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async copyAsset(source: string, target: string, overwrite: boolean = false): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const options = {
                overwrite: overwrite,
                rename: !overwrite
            };

            Editor.Message.request('asset-db', 'copy-asset', source, target, options).then((result: any) => {
                if (result && result.uuid) {
                    resolve({
                        success: true,
                        data: {
                            uuid: result.uuid,
                            url: result.url,
                            message: 'Asset copied successfully'
                        }
                    });
                } else {
                    resolve({
                        success: true,
                        data: {
                            source: source,
                            target: target,
                            message: 'Asset copied successfully'
                        }
                    });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async moveAsset(source: string, target: string, overwrite: boolean = false): Promise<ToolResponse> {
        return new Promise((resolve) => {
            const options = {
                overwrite: overwrite,
                rename: !overwrite
            };

            Editor.Message.request('asset-db', 'move-asset', source, target, options).then((result: any) => {
                if (result && result.uuid) {
                    resolve({
                        success: true,
                        data: {
                            uuid: result.uuid,
                            url: result.url,
                            message: 'Asset moved successfully'
                        }
                    });
                } else {
                    resolve({
                        success: true,
                        data: {
                            source: source,
                            target: target,
                            message: 'Asset moved successfully'
                        }
                    });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async deleteAsset(url: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'delete-asset', url).then((result: any) => {
                resolve({
                    success: true,
                    data: {
                        url: url,
                        message: 'Asset deleted successfully'
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async saveAsset(url: string, content: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'save-asset', url, content).then((result: any) => {
                if (result && result.uuid) {
                    resolve({
                        success: true,
                        data: {
                            uuid: result.uuid,
                            url: result.url,
                            message: 'Asset saved successfully'
                        }
                    });
                } else {
                    resolve({
                        success: true,
                        data: {
                            url: url,
                            message: 'Asset saved successfully'
                        }
                    });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async reimportAsset(url: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'reimport-asset', url).then(() => {
                resolve({
                    success: true,
                    data: {
                        url: url,
                        message: 'Asset reimported successfully'
                    }
                });
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async queryAssetPath(url: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'query-path', url).then((path: string | null) => {
                if (path) {
                    resolve({
                        success: true,
                        data: {
                            url: url,
                            path: path,
                            message: 'Asset path retrieved successfully'
                        }
                    });
                } else {
                    resolve({ success: false, error: 'Asset path not found' });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async queryAssetUuid(url: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'query-uuid', url).then((uuid: string | null) => {
                if (uuid) {
                    resolve({
                        success: true,
                        data: {
                            url: url,
                            uuid: uuid,
                            message: 'Asset UUID retrieved successfully'
                        }
                    });
                } else {
                    resolve({ success: false, error: 'Asset UUID not found' });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async queryAssetUrl(uuid: string): Promise<ToolResponse> {
        return new Promise((resolve) => {
            Editor.Message.request('asset-db', 'query-url', uuid).then((url: string | null) => {
                if (url) {
                    resolve({
                        success: true,
                        data: {
                            uuid: uuid,
                            url: url,
                            message: 'Asset URL retrieved successfully'
                        }
                    });
                } else {
                    resolve({ success: false, error: 'Asset URL not found' });
                }
            }).catch((err: Error) => {
                resolve({ success: false, error: err.message });
            });
        });
    }

    private async findAssetByName(args: any): Promise<ToolResponse> {
        const { name, exactMatch = false, assetType = 'all', folder = 'db://assets', maxResults = 20 } = args;
        
        return new Promise(async (resolve) => {
            try {
                // Get all assets in the specified folder
                const allAssetsResponse = await this.getAssets(assetType, folder);
                if (!allAssetsResponse.success || !allAssetsResponse.data) {
                    resolve({
                        success: false,
                        error: `Failed to get assets: ${allAssetsResponse.error}`
                    });
                    return;
                }
                
                const allAssets = allAssetsResponse.data.assets as any[];
                let matchedAssets: any[] = [];
                
                // Search for matching assets
                for (const asset of allAssets) {
                    const assetName = asset.name;
                    let matches = false;
                    
                    if (exactMatch) {
                        matches = assetName === name;
                    } else {
                        matches = assetName.toLowerCase().includes(name.toLowerCase());
                    }
                    
                    if (matches) {
                        // Get detailed asset info if needed
                        try {
                            const detailResponse = await this.getAssetInfo(asset.path);
                            if (detailResponse.success) {
                                matchedAssets.push({
                                    ...asset,
                                    details: detailResponse.data
                                });
                            } else {
                                matchedAssets.push(asset);
                            }
                        } catch {
                            matchedAssets.push(asset);
                        }
                        
                        if (matchedAssets.length >= maxResults) {
                            break;
                        }
                    }
                }
                
                resolve({
                    success: true,
                    data: {
                        searchTerm: name,
                        exactMatch,
                        assetType,
                        folder,
                        totalFound: matchedAssets.length,
                        maxResults,
                        assets: matchedAssets,
                        message: `Found ${matchedAssets.length} assets matching '${name}'`
                    }
                });
                
            } catch (error: any) {
                resolve({
                    success: false,
                    error: `Asset search failed: ${error.message}`
                });
            }
        });
    }
    
    private async getAssetDetails(assetPath: string, includeSubAssets: boolean = true): Promise<ToolResponse> {
        return new Promise(async (resolve) => {
            try {
                // Get basic asset info
                const assetInfoResponse = await this.getAssetInfo(assetPath);
                if (!assetInfoResponse.success) {
                    resolve(assetInfoResponse);
                    return;
                }
                
                const assetInfo = assetInfoResponse.data;
                const detailedInfo: any = {
                    ...assetInfo,
                    subAssets: []
                };
                
                if (includeSubAssets && assetInfo) {
                    // For image assets, try to get spriteFrame and texture sub-assets
                    if (assetInfo.type === 'cc.ImageAsset' || assetPath.match(/\.(png|jpg|jpeg|gif|tga|bmp|psd)$/i)) {
                        // Generate common sub-asset UUIDs
                        const baseUuid = assetInfo.uuid;
                        const possibleSubAssets = [
                            { type: 'spriteFrame', uuid: `${baseUuid}@f9941`, suffix: '@f9941' },
                            { type: 'texture', uuid: `${baseUuid}@6c48a`, suffix: '@6c48a' },
                            { type: 'texture2D', uuid: `${baseUuid}@6c48a`, suffix: '@6c48a' }
                        ];
                        
                        for (const subAsset of possibleSubAssets) {
                            try {
                                // Try to get URL for the sub-asset to verify it exists
                                const subAssetUrl = await Editor.Message.request('asset-db', 'query-url', subAsset.uuid);
                                if (subAssetUrl) {
                                    detailedInfo.subAssets.push({
                                        type: subAsset.type,
                                        uuid: subAsset.uuid,
                                        url: subAssetUrl,
                                        suffix: subAsset.suffix
                                    });
                                }
                            } catch {
                                // Sub-asset doesn't exist, skip it
                            }
                        }
                    }
                }
                
                resolve({
                    success: true,
                    data: {
                        assetPath,
                        includeSubAssets,
                        ...detailedInfo,
                        message: `Asset details retrieved. Found ${detailedInfo.subAssets.length} sub-assets.`
                    }
                });
                
            } catch (error: any) {
                resolve({
                    success: false,
                    error: `Failed to get asset details: ${error.message}`
                });
            }
        });
    }
}
