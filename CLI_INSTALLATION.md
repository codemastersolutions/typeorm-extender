# 🛠️ Guia de Instalação e Troubleshooting do CLI

## 📦 Instalação

### Instalação Global (Recomendada)
```bash
npm install -g @codemastersolutions/typeorm-extender
```

### Instalação Local no Projeto
```bash
npm install @codemastersolutions/typeorm-extender --save-dev
```

## 🔧 Uso

### Instalação Global
Após a instalação global, o comando `typeorm-extender` estará disponível em qualquer lugar:

```bash
typeorm-extender --help
typeorm-extender init
typeorm-extender migration:run
```

### Instalação Local
Com instalação local, use através do npx ou scripts do package.json:

```bash
# Usando npx
npx typeorm-extender --help
npx typeorm-extender init

# Ou adicione scripts no package.json
{
  "scripts": {
    "db:init": "typeorm-extender init",
    "db:migrate": "typeorm-extender migration:run",
    "db:seed": "typeorm-extender seed:run",
    "db:setup": "typeorm-extender db:setup"
  }
}
```

## 🚨 Troubleshooting

### Problema: "command not found: typeorm-extender"

#### Solução 1: Verificar Instalação Global
```bash
# Verificar se o pacote está instalado globalmente
npm list -g @codemastersolutions/typeorm-extender

# Se não estiver instalado, instale globalmente
npm install -g @codemastersolutions/typeorm-extender
```

#### Solução 2: Verificar PATH do npm
```bash
# Verificar onde o npm instala pacotes globais
npm config get prefix

# Verificar se o diretório bin do npm está no PATH
echo $PATH

# Adicionar ao PATH se necessário (adicione ao ~/.bashrc ou ~/.zshrc)
export PATH="$(npm config get prefix)/bin:$PATH"
```

#### Solução 3: Usar npx (Instalação Local)
```bash
# Se instalado localmente, use npx
npx typeorm-extender --help
```

#### Solução 4: Verificar Permissões
```bash
# Verificar permissões do arquivo bin
ls -la $(npm config get prefix)/bin/typeorm-extender

# Corrigir permissões se necessário
chmod +x $(npm config get prefix)/bin/typeorm-extender
```

### Problema: Erro de Dependências

#### Solução: Instalar Dependências Peer
```bash
# O TypeORM é uma dependência peer obrigatória
npm install typeorm

# Para projetos TypeScript
npm install typescript ts-node @types/node
```

### Problema: Erro "Cannot find module"

#### Solução: Limpar Cache e Reinstalar
```bash
# Limpar cache do npm
npm cache clean --force

# Desinstalar e reinstalar
npm uninstall -g @codemastersolutions/typeorm-extender
npm install -g @codemastersolutions/typeorm-extender
```

## 🔍 Verificação da Instalação

```bash
# Verificar se o comando está disponível
which typeorm-extender

# Verificar versão
typeorm-extender --version

# Verificar ajuda
typeorm-extender --help
```

## 📋 Requisitos do Sistema

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **TypeORM**: >= 0.3.0 (peer dependency)

## 🆘 Suporte

Se os problemas persistirem:

1. Verifique se sua versão do Node.js é compatível
2. Tente reinstalar o pacote
3. Verifique as issues no [repositório GitHub](https://github.com/codemastersolutions/typeorm-extender/issues)
4. Abra uma nova issue com detalhes do erro

## 📝 Logs de Debug

Para obter mais informações sobre erros:

```bash
# Executar com logs detalhados
DEBUG=* typeorm-extender init

# Ou verificar logs do npm
npm config set loglevel verbose
```