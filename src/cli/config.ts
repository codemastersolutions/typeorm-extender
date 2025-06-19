import * as fs from 'fs';
import * as path from 'path';
import { SupportedLanguage } from './i18n';

export interface CliConfig {
  language?: SupportedLanguage;
  database?: {
    type?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
  };
  directories?: {
    migrations?: string;
    factories?: string;
    seeds?: string;
  };
}

const CONFIG_FILE_NAMES = [
  'typeorm-extender.config.json',
  '.typeorm-extender.json',
  'typeorm-extender.json'
];

export class ConfigManager {
  private static instance: ConfigManager;
  private config: CliConfig = {};
  private configPath?: string;

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): void {
    // Try to find config file in current directory and parent directories
    let currentDir = process.cwd();
    const rootDir = path.parse(currentDir).root;

    while (currentDir !== rootDir) {
      for (const fileName of CONFIG_FILE_NAMES) {
        const configPath = path.join(currentDir, fileName);
        if (fs.existsSync(configPath)) {
          try {
            const configContent = fs.readFileSync(configPath, 'utf8');
            this.config = JSON.parse(configContent);
            this.configPath = configPath;
            return;
          } catch (error) {
            console.warn(`⚠️  Warning: Invalid JSON in config file ${configPath}`);
          }
        }
      }
      currentDir = path.dirname(currentDir);
    }
  }

  public getConfig(): CliConfig {
    return this.config;
  }

  public getLanguage(): SupportedLanguage | undefined {
    return this.config.language;
  }

  public setLanguage(language: SupportedLanguage): void {
    this.config.language = language;
    this.saveConfig();
  }

  public getConfigPath(): string | undefined {
    return this.configPath;
  }

  private saveConfig(): void {
    if (!this.configPath) {
      this.configPath = path.join(process.cwd(), 'typeorm-extender.config.json');
    }

    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.warn(`⚠️  Warning: Could not save config file: ${error}`);
    }
  }

  public createDefaultConfig(): void {
    const defaultConfig: CliConfig = {
      language: 'en',
      database: {
        type: 'postgres'
      },
      directories: {
        migrations: 'src/migrations',
        factories: 'src/factories',
        seeds: 'src/seeds'
      }
    };

    this.config = defaultConfig;
    this.configPath = path.join(process.cwd(), 'typeorm-extender.config.json');
    this.saveConfig();
  }
}

export const configManager = ConfigManager.getInstance();