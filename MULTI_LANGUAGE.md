# Multi-Language Support / Suporte Multi-Idiomas / Soporte Multi-Idiomas

## English

### Overview
The TypeORM Extender CLI supports multiple languages to provide a better user experience for developers worldwide. Currently supported languages:

- **English (en)** - Default language
- **Portuguese Brazil (pt-BR)** - Português do Brasil
- **Spanish (es)** - Español

### Setting Language

There are multiple ways to set your preferred language, listed by priority:

#### 1. CLI Command Option (Highest Priority)
```bash
# Use language for a single command
typeorm-extender --language pt-BR migration:create CreateUser
typeorm-extender --language es seed:run
```

#### 2. Environment Variable
```bash
# Set for current session
export TYPEORM_EXTENDER_LANG=pt-BR
typeorm-extender migration:create CreateUser

# Or use inline
TYPEORM_EXTENDER_LANG=es typeorm-extender seed:run
```

#### 3. Configuration File
Create a configuration file in your project root:

**typeorm-extender.config.json**
```json
{
  "language": "pt-BR",
  "database": {
    "type": "postgres"
  },
  "directories": {
    "migrations": "src/migrations",
    "factories": "src/factories",
    "seeds": "src/seeds"
  }
}
```

#### 4. Configuration Management Commands
```bash
# List supported languages
typeorm-extender config --list

# Set language permanently
typeorm-extender config --language pt-BR

# Show current configuration
typeorm-extender config --show

# Reset to defaults
typeorm-extender config --reset
```

### Supported Configuration Files
The CLI looks for configuration files in this order:
- `typeorm-extender.config.json`
- `.typeorm-extender.json`
- `typeorm-extender.json`

---

## Português (Brasil)

### Visão Geral
A CLI do TypeORM Extender suporta múltiplos idiomas para proporcionar uma melhor experiência para desenvolvedores ao redor do mundo. Idiomas atualmente suportados:

- **Inglês (en)** - Idioma padrão
- **Português Brasil (pt-BR)** - Português do Brasil
- **Espanhol (es)** - Español

### Definindo o Idioma

Existem várias maneiras de definir seu idioma preferido, listadas por prioridade:

#### 1. Opção de Comando CLI (Maior Prioridade)
```bash
# Usar idioma para um único comando
typeorm-extender --language pt-BR migration:create CreateUser
typeorm-extender --language es seed:run
```

#### 2. Variável de Ambiente
```bash
# Definir para a sessão atual
export TYPEORM_EXTENDER_LANG=pt-BR
typeorm-extender migration:create CreateUser

# Ou usar inline
TYPEORM_EXTENDER_LANG=pt-BR typeorm-extender seed:run
```

#### 3. Arquivo de Configuração
Crie um arquivo de configuração na raiz do seu projeto:

**typeorm-extender.config.json**
```json
{
  "language": "pt-BR",
  "database": {
    "type": "postgres"
  },
  "directories": {
    "migrations": "src/migrations",
    "factories": "src/factories",
    "seeds": "src/seeds"
  }
}
```

#### 4. Comandos de Gerenciamento de Configuração
```bash
# Listar idiomas suportados
typeorm-extender config --list

# Definir idioma permanentemente
typeorm-extender config --language pt-BR

# Mostrar configuração atual
typeorm-extender config --show

# Resetar para padrões
typeorm-extender config --reset
```

### Arquivos de Configuração Suportados
A CLI procura por arquivos de configuração nesta ordem:
- `typeorm-extender.config.json`
- `.typeorm-extender.json`
- `typeorm-extender.json`

---

## Español

### Descripción General
La CLI de TypeORM Extender soporta múltiples idiomas para proporcionar una mejor experiencia de usuario para desarrolladores de todo el mundo. Idiomas actualmente soportados:

- **Inglés (en)** - Idioma por defecto
- **Portugués Brasil (pt-BR)** - Português do Brasil
- **Español (es)** - Español

### Configurar Idioma

Hay múltiples formas de establecer tu idioma preferido, listadas por prioridad:

#### 1. Opción de Comando CLI (Mayor Prioridad)
```bash
# Usar idioma para un solo comando
typeorm-extender --language pt-BR migration:create CreateUser
typeorm-extender --language es seed:run
```

#### 2. Variable de Entorno
```bash
# Establecer para la sesión actual
export TYPEORM_EXTENDER_LANG=es
typeorm-extender migration:create CreateUser

# O usar inline
TYPEORM_EXTENDER_LANG=es typeorm-extender seed:run
```

#### 3. Archivo de Configuración
Crea un archivo de configuración en la raíz de tu proyecto:

**typeorm-extender.config.json**
```json
{
  "language": "es",
  "database": {
    "type": "postgres"
  },
  "directories": {
    "migrations": "src/migrations",
    "factories": "src/factories",
    "seeds": "src/seeds"
  }
}
```

#### 4. Comandos de Gestión de Configuración
```bash
# Listar idiomas soportados
typeorm-extender config --list

# Establecer idioma permanentemente
typeorm-extender config --language es

# Mostrar configuración actual
typeorm-extender config --show

# Resetear a valores por defecto
typeorm-extender config --reset
```

### Archivos de Configuración Soportados
La CLI busca archivos de configuración en este orden:
- `typeorm-extender.config.json`
- `.typeorm-extender.json`
- `typeorm-extender.json`

---

## Examples / Exemplos / Ejemplos

### Quick Start
```bash
# English (default)
typeorm-extender init

# Portuguese
TYPEORM_EXTENDER_LANG=pt-BR typeorm-extender init

# Spanish
typeorm-extender --language es init
```

### Configuration Management
```bash
# Set Portuguese as default
typeorm-extender config --language pt-BR

# Check current settings
typeorm-extender config --show

# List all supported languages
typeorm-extender config --list
```

### Environment Variables
```bash
# Bash/Zsh
export TYPEORM_EXTENDER_LANG=pt-BR

# Fish
set -x TYPEORM_EXTENDER_LANG pt-BR

# Windows CMD
set TYPEORM_EXTENDER_LANG=pt-BR

# Windows PowerShell
$env:TYPEORM_EXTENDER_LANG="pt-BR"
```