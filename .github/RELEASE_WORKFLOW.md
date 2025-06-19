# GitHub Actions - Release Workflow

Este documento explica como funciona o workflow automatizado de release e publicação do pacote `@codemastersolutions/typeorm-extender`.

## 🚀 Como Funciona

O workflow é acionado automaticamente quando um **Pull Request é merged na branch `main`** e executa as seguintes ações:

1. **Análise do PR**: Determina o tipo de versão a ser incrementada
2. **Build**: Compila o projeto TypeScript
3. **Incremento de Versão**: Atualiza automaticamente a versão no `package.json`
4. **Commit e Tag**: Cria commit com a nova versão e tag Git
5. **Release**: Cria um release no GitHub com changelog
6. **Publicação**: Publica automaticamente no NPM
7. **Notificação**: Comenta no PR com informações do release

## 📋 Pré-requisitos

### 1. Secrets do GitHub

Configure os seguintes secrets no repositório GitHub:

#### `NPM_TOKEN` (Obrigatório)
1. Acesse [npmjs.com](https://www.npmjs.com/)
2. Vá em **Account Settings** → **Access Tokens**
3. Clique em **Generate New Token** → **Classic Token**
4. Selecione **Automation** como tipo
5. Copie o token gerado
6. No GitHub: **Settings** → **Secrets and variables** → **Actions**
7. Clique em **New repository secret**
8. Nome: `NPM_TOKEN`
9. Valor: Cole o token do NPM

#### `GITHUB_TOKEN` (Automático)
O `GITHUB_TOKEN` é fornecido automaticamente pelo GitHub Actions.

### 2. Permissões do Repositório

Certifique-se de que o repositório tem as seguintes permissões habilitadas:
- **Settings** → **Actions** → **General**
- **Workflow permissions**: "Read and write permissions"
- **Allow GitHub Actions to create and approve pull requests**: ✅ Habilitado

## 🏷️ Tipos de Versão

O workflow determina automaticamente o tipo de incremento baseado no **título e descrição do Pull Request**:

### 🔴 MAJOR (x.0.0)
**Palavras-chave**: `breaking`, `major`, `BREAKING CHANGE`

**Exemplo de título de PR**:
- `feat: BREAKING CHANGE - new API structure`
- `refactor: major changes to core functionality`

### 🟡 MINOR (x.y.0)
**Palavras-chave**: `feat`, `feature`, `minor`

**Exemplo de título de PR**:
- `feat: add new TypeORM extension methods`
- `feature: implement database connection pooling`

### 🟢 PATCH (x.y.z)
**Padrão para todos os outros casos**

**Exemplo de título de PR**:
- `fix: resolve connection timeout issue`
- `docs: update README with examples`
- `chore: update dependencies`

## 📝 Convenções de Commit

Recomenda-se usar [Conventional Commits](https://www.conventionalcommits.org/) para melhor organização:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos comuns**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

## 🔄 Fluxo de Trabalho

### 1. Desenvolvimento
```bash
# Criar branch para feature/fix
git checkout -b feat/nova-funcionalidade

# Fazer alterações e commits
git add .
git commit -m "feat: add new extension method"

# Push da branch
git push origin feat/nova-funcionalidade
```

### 2. Pull Request
1. Criar PR no GitHub
2. **Título importante**: Use palavras-chave para determinar versão
3. Aguardar review e aprovação
4. **Merge** do PR (não squash, para preservar histórico)

### 3. Release Automático
Após o merge:
1. ✅ Workflow executa automaticamente
2. ✅ Versão é incrementada
3. ✅ Release é criado no GitHub
4. ✅ Pacote é publicado no NPM
5. ✅ Comentário é adicionado ao PR

## 📊 Monitoramento

### Verificar Execução
1. Vá para **Actions** no repositório GitHub
2. Clique no workflow "Release and Publish"
3. Verifique logs de cada step

### Verificar Publicação
1. **NPM**: https://www.npmjs.com/package/@codemastersolutions/typeorm-extender
2. **GitHub Releases**: https://github.com/codemastersolutions/typeorm-extender/releases

## 🚨 Troubleshooting

### Erro de Permissão NPM
```
npm ERR! 403 Forbidden
```
**Solução**: Verificar se o `NPM_TOKEN` está correto e tem permissões de publicação.

### Erro de Tag Duplicada
```
fatal: tag 'v1.0.0' already exists
```
**Solução**: Tag já existe. O workflow pula automaticamente se a versão não mudou.

### Erro de Build
```
npm ERR! Build failed
```
**Solução**: Verificar se o código compila localmente com `npm run build`.

### Workflow Não Executa
**Possíveis causas**:
1. PR não foi merged (apenas fechado)
2. Merge foi feito em branch diferente de `main`
3. Permissões do GitHub Actions desabilitadas

## 🔧 Customização

Para modificar o comportamento do workflow, edite o arquivo `.github/workflows/release.yml`:

- **Alterar palavras-chave**: Modifique as regex no step "Determine version bump type"
- **Mudar branch**: Altere `branches: [main]` para sua branch principal
- **Adicionar testes**: Inclua steps de teste antes da publicação
- **Modificar changelog**: Customize o step "Generate changelog"

## 📚 Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)