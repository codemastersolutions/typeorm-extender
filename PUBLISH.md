# Guia de Publicação no NPM

Este documento descreve como publicar o pacote `@codemastersolutions/typeorm-extender` no NPM registry.

## Pré-requisitos

1. **Conta no NPM**: Certifique-se de ter uma conta no [npmjs.com](https://www.npmjs.com/)
2. **Login no NPM**: Execute `npm login` para fazer login na sua conta
3. **Permissões**: Certifique-se de ter permissões para publicar no escopo `@codemastersolutions`

## Passos para Publicação

### 1. Verificar a Configuração

O projeto já está configurado com:
- ✅ `package.json` com configurações adequadas para publicação
- ✅ `tsconfig.json` configurado para gerar arquivos de declaração
- ✅ Script `prepublishOnly` que compila automaticamente antes da publicação
- ✅ `.npmignore` para excluir arquivos desnecessários
- ✅ Estrutura de diretórios adequada (`src/` para código fonte, `dist/` para compilado)

### 2. Testar a Compilação

```bash
npm run build
```

Este comando deve gerar os arquivos compilados no diretório `dist/`.

### 3. Verificar o Conteúdo do Pacote

```bash
npm pack --dry-run
```

Este comando mostra quais arquivos serão incluídos no pacote sem criar o arquivo `.tgz`.

### 4. Atualizar a Versão

```bash
# Para uma correção de bug (0.0.1 -> 0.0.2)
npm version patch

# Para uma nova funcionalidade (0.0.1 -> 0.1.0)
npm version minor

# Para mudanças que quebram compatibilidade (0.0.1 -> 1.0.0)
npm version major
```

### 5. Publicar

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

## Automação (Opcional)

Para automatizar o processo, considere usar GitHub Actions ou similar para:
- Executar testes
- Fazer build
- Publicar automaticamente em tags/releases