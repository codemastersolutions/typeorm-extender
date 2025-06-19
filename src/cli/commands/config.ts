import { i18n, SupportedLanguage } from '../i18n';
import { configManager } from '../config';

interface ConfigOptions {
  language?: string;
  list?: boolean;
  reset?: boolean;
  show?: boolean;
}

export function manageConfig(...args: any[]): void {
    console.log('Debug - All arguments:', args);
    console.log('Debug - Number of arguments:', args.length);
    
    // O Commander.js pode passar argumentos de diferentes formas
    // Vamos tentar identificar onde estão as opções
    let options: ConfigOptions = {};
    
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        console.log(`Debug - Arg ${i}:`, arg);
        
        if (arg && typeof arg === 'object' && !Array.isArray(arg)) {
            // Verificar se este objeto tem as propriedades que esperamos diretamente
            if ('show' in arg || 'list' in arg || 'language' in arg || 'reset' in arg) {
                options = arg;
                break;
            }
            
            // Se não encontrou, verificar se tem um método opts()
            if (typeof arg.opts === 'function') {
                const opts = arg.opts();
                console.log(`Debug - opts() result:`, opts);
                if (opts && (opts.show || opts.list || opts.language || opts.reset)) {
                    options = opts;
                    break;
                }
            }
            
            // Verificar se as opções estão em alguma propriedade específica
            for (const key of Object.keys(arg)) {
                const value = arg[key];
                if (value && typeof value === 'object' && 
                    ('show' in value || 'list' in value || 'language' in value || 'reset' in value)) {
                    console.log(`Debug - Found options in property '${key}':`, value);
                    options = value;
                    break;
                }
            }
            
            if (Object.keys(options).length > 0) break;
        }
    }
    
    console.log('Debug - Final options:', JSON.stringify(options, null, 2));
    
    try {
        // Se options estiver vazio, significa que não há opções definidas
        if (!options || Object.keys(options).length === 0) {
            showConfigHelp();
            return;
        }

        if (options.show) {
            showCurrentConfig();
        } else if (options.list) {
            listSupportedLanguages();
        } else if (options.language) {
            setLanguage(options.language);
        } else if (options.reset) {
            resetConfiguration();
        } else {
            showConfigHelp();
        }
    } catch (error) {
        console.error('❌ Error managing configuration:', error);
        process.exit(1);
    }
}

function getLanguageName(lang: string): string {
    const names: Record<string, string> = {
        'en': 'English',
        'pt-BR': 'Português (Brasil)',
        'es': 'Español'
    };
    return names[lang] || lang;
}

function showCurrentConfig(): void {
    const config = configManager.getConfig();
    const configPath = configManager.getConfigPath();
    
    console.log('\n📋 Current Configuration:');
    console.log('─'.repeat(40));
    console.log(`Language: ${config.language || 'en (default)'}`);
    console.log(`Config file: ${configPath || 'Not found'}`);
    
    if (config.database) {
        console.log(`Database type: ${config.database.type || 'Not set'}`);
    }
    
    if (config.directories) {
        console.log('Directories:');
        console.log(`  Migrations: ${config.directories.migrations || 'src/migrations'}`);
        console.log(`  Factories: ${config.directories.factories || 'src/factories'}`);
        console.log(`  Seeds: ${config.directories.seeds || 'src/seeds'}`);
    }
    
    console.log('─'.repeat(40));
}

function listSupportedLanguages(): void {
    const supportedLanguages = i18n.getSupportedLanguages();
    const currentLanguage = i18n.getLanguage();
    
    console.log('\n🌍 Supported Languages:');
    console.log('─'.repeat(30));
    
    supportedLanguages.forEach(lang => {
        const marker = lang === currentLanguage ? '→' : ' ';
        const langName = getLanguageName(lang);
        console.log(`${marker} ${lang} - ${langName}`);
    });
    
    console.log('─'.repeat(30));
    console.log('\n💡 Usage:');
    console.log('  typeorm-extender config --language <lang>');
    console.log('  typeorm-extender --language <lang> <command>');
    console.log('  export TYPEORM_EXTENDER_LANG=<lang>');
}

function setLanguage(language: string): void {
    const supportedLanguages = i18n.getSupportedLanguages();
    
    if (!supportedLanguages.includes(language as SupportedLanguage)) {
        console.error(`❌ Unsupported language: ${language}`);
        console.error(`Supported languages: ${supportedLanguages.join(', ')}`);
        process.exit(1);
    }
    
    const lang = language as SupportedLanguage;
    configManager.setLanguage(lang);
    i18n.setLanguage(lang);
    
    const langName = getLanguageName(lang);
    console.log(`✅ Language set to: ${lang} (${langName})`);
    console.log(`📁 Config saved to: ${configManager.getConfigPath()}`);
}

function resetConfiguration(): void {
    configManager.createDefaultConfig();
    console.log('✅ Configuration reset to defaults');
    console.log('📁 Config file created: typeorm-extender.config.json');
}

function showConfigHelp(): void {
  console.log('\n⚙️  Configuration Management');
  console.log('─'.repeat(40));
  console.log('Available options:');
  console.log('  --show      Show current configuration');
  console.log('  --list      List supported languages');
  console.log('  --language  Set language (en, pt-BR, es)');
  console.log('  --reset     Reset to default configuration');
  console.log('\nExamples:');
  console.log('  typeorm-extender config --show');
  console.log('  typeorm-extender config --language pt-BR');
  console.log('  typeorm-extender config --list');
}