# Guia de Publicação no NPM

Este documento descreve como publicar o pacote `@codemastersolutions/typeorm-extender` no NPM registry.

## Pré-requisitos

1. **Conta NPM**: Certifique-se de ter uma conta no [npmjs.com](https://www.npmjs.com/)
2. **Autenticação**: Execute `npm login` para autenticar
3. **Permissões**: Verifique se tem permissão para publicar no escopo `@codemastersolutions`
4. **Testes**: Certifique-se de que todos os testes passam (`npm test`)
5. **Build**: Certifique-se de que o projeto compila sem erros

## Passos para Publicação

### 1. Verificar a Configuração

O projeto já está configurado com:
- ✅ `package.json` com configurações adequadas para publicação
- ✅ `tsconfig.json` configurado para gerar arquivos de declaração
- ✅ Script `prepublishOnly` que compila automaticamente antes da publicação
- ✅ `.npmignore` para excluir arquivos desnecessários
- ✅ Estrutura de diretórios adequada (`src/` para código fonte, `dist/` para compilado)

### 2. Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura (opcional)
npm run test:coverage

# Verificar se todos os testes passaram
echo "✅ Todos os testes devem passar antes de publicar"
```

### 3. Testar a Compilação

```bash
# Limpar diretório de build anterior
npm run clean

# Compilar o projeto
npm run build

# Verificar se os arquivos foram gerados
ls -la dist/
```

Este comando deve gerar os arquivos compilados no diretório `dist/`.

### 4. Verificar o Conteúdo do Pacote

```bash
npm pack --dry-run
```

Este comando mostra quais arquivos serão incluídos no pacote sem criar o arquivo `.tgz`.

### 5. Atualizar a Versão

```bash
# Para uma correção de bug (0.0.1 -> 0.0.2)
npm version patch

# Para uma nova funcionalidade (0.0.1 -> 0.1.0)
npm version minor

# Para mudanças que quebram compatibilidade (0.0.1 -> 1.0.0)
npm version major
```

### 6. Publicar

```bash
npm publish
```

O script `prepublishOnly` será executado automaticamente, limpando e recompilando o projeto.

## Configurações Importantes

### package.json

- **name**: `@codemastersolutions/typeorm-extender` (pacote com escopo)
- **main**: `dist/index.js` (ponto de entrada principal)
- **types**: `dist/index.d.ts` (definições TypeScript)
- **files**: Array especificando quais arquivos incluir no pacote
- **publishConfig.access**: `public` (necessário para pacotes com escopo)
- **engines.node**: Especifica a versão mínima do Node.js
- **peerDependencies**: TypeORM como dependência peer

### Scripts NPM

- **build**: Compila o TypeScript
- **clean**: Remove o diretório `dist`
- **prepublishOnly**: Executa automaticamente antes da publicação

## Verificação Pós-Publicação

1. Verifique se o pacote aparece em: https://www.npmjs.com/package/@codemastersolutions/typeorm-extender
2. Teste a instalação em um projeto separado:
   ```bash
   npm install @codemastersolutions/typeorm-extender
   ```
3. Verifique se as definições TypeScript estão funcionando corretamente

## Troubleshooting

### Erro de Permissão

Se receber erro de permissão, certifique-se de:
1. Estar logado: `npm whoami`
2. Ter acesso ao escopo: `npm access list packages @codemastersolutions`
3. O escopo existe e você tem permissões

### Erro de Versão

Se a versão já existe:
1. Atualize a versão no `package.json`
2. Ou use `npm version patch/minor/major`

### Problemas de Build

Se houver erros de compilação:
1. Verifique o `tsconfig.json`
2. Certifique-se de que todas as dependências estão instaladas
3. Execute `npm run clean && npm run build`

## 🤖 Automação com GitHub Actions

### Workflow Automatizado Configurado

O projeto agora inclui um **workflow GitHub Actions** que automatiza completamente o processo de release:

- ✅ **Acionamento**: Automático quando PR é merged na branch `main`
- ✅ **Versionamento**: Incremento automático baseado no título do PR
- ✅ **Build**: Compilação automática do TypeScript
- ✅ **Release**: Criação automática de release no GitHub
- ✅ **Publicação**: Publicação automática no NPM
- ✅ **Changelog**: Geração automática baseada nos commits

### Como Usar o Workflow

1. **Configure o NPM Token**:
   ```bash
   # No GitHub: Settings → Secrets → Actions
   # Adicione: NPM_TOKEN com seu token do npmjs.com
   ```

2. **Crie PRs com títulos descritivos**:
   - `feat: nova funcionalidade` → versão MINOR
   - `fix: correção de bug` → versão PATCH
   - `feat: BREAKING CHANGE` → versão MAJOR

3. **Merge o PR**: O workflow executa automaticamente

### Documentação Completa

Veja o arquivo `.github/RELEASE_WORKFLOW.md` para instruções detalhadas sobre:
- Configuração de secrets
- Convenções de versionamento
- Troubleshooting
- Customização do workflow

### Publicação Manual (Alternativa)

Se preferir publicar manualmente, siga os passos originais abaixo: