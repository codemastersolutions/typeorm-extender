# Semantic Versioning com Conventional Commits

Este projeto agora utiliza **Semantic Versioning** automatizado baseado em **Conventional Commits** para determinar o tipo de bump de versão.

## Como Funciona

O sistema analisa os commits desde a última tag para determinar automaticamente se a nova versão deve ser:

- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (0.x.0) - Novas funcionalidades
- **PATCH** (0.0.x) - Bug fixes e outras mudanças

## Formato dos Commits

Use o formato de **Conventional Commits**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos de Commit

| Tipo | Descrição | Bump de Versão |
|------|-----------|----------------|
| `feat` | Nova funcionalidade | **MINOR** |
| `fix` | Correção de bug | **PATCH** |
| `docs` | Mudanças na documentação | **PATCH** |
| `style` | Mudanças de formatação | **PATCH** |
| `refactor` | Refatoração de código | **PATCH** |
| `perf` | Melhoria de performance | **PATCH** |
| `test` | Adição ou correção de testes | **PATCH** |
| `build` | Mudanças no sistema de build | **PATCH** |
| `ci` | Mudanças na CI/CD | **PATCH** |
| `chore` | Outras mudanças | **PATCH** |
| `revert` | Reversão de commit | **PATCH** |

### Breaking Changes (MAJOR)

Para indicar uma **breaking change** que requer bump **MAJOR**:

1. Adicione `!` após o tipo: `feat!: remove deprecated API`
2. Ou inclua `BREAKING CHANGE:` no footer:
   ```
   feat: add new authentication system
   
   BREAKING CHANGE: removes support for legacy auth tokens
   ```

## Exemplos

### Patch (0.0.x)
```bash
fix: resolve memory leak in connection pool
fix(auth): handle null user sessions properly
docs: update installation instructions
test: add unit tests for user service
```

### Minor (0.x.0)
```bash
feat: add support for PostgreSQL arrays
feat(query): implement advanced filtering options
```

### Major (x.0.0)
```bash
feat!: redesign public API interface
fix!: remove deprecated methods

feat: add new caching system

BREAKING CHANGE: removes support for Node.js < 18
```

## Scripts Disponíveis

- `npm run version:bump` - Determina o tipo de bump baseado nos commits
- `npm run changelog:generate` - Gera changelog baseado em conventional commits
- `npm run release:check` - Executa testes e build antes do release

## Workflow de Release

O workflow de release (`/.github/workflows/release.yml`) foi atualizado para:

1. ✅ Analisar commits usando conventional commits
2. ✅ Determinar automaticamente o tipo de bump
3. ✅ Gerar changelog categorizado
4. ✅ Criar release com informações detalhadas
5. ✅ Publicar no NPM
6. ✅ Comentar no PR com detalhes do release

## Benefícios

- 🤖 **Automação completa** do versionamento
- 📋 **Changelog estruturado** e legível
- 🔍 **Rastreabilidade** de mudanças
- 📦 **Compatibilidade** com ferramentas de semantic versioning
- 🚀 **Releases consistentes** e previsíveis

---

**Nota**: Este sistema garante que as versões sejam incrementadas de forma consistente e que os changelogs sejam informativos e bem estruturados.