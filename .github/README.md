# GitHub Workflows

Este diretório contém os workflows do GitHub Actions para automatizar processos de CI/CD do projeto TypeORM Extender.

## 📁 Estrutura

```
.github/
├── workflows/
│   └── release.yml          # Workflow principal de release e publicação
├── RELEASE_WORKFLOW.md      # Documentação detalhada do workflow
└── README.md               # Este arquivo
```

## 🚀 Workflows Disponíveis

### 1. Release and Publish (`release.yml`)

**Trigger**: Pull Request merged na branch `main`

**Funcionalidades**:
- ✅ Análise automática do tipo de versão (major/minor/patch)
- ✅ Incremento automático da versão no `package.json`
- ✅ Build e compilação do TypeScript
- ✅ Criação de tag Git
- ✅ Geração de changelog automático
- ✅ Criação de release no GitHub
- ✅ Publicação automática no NPM
- ✅ Comentário no PR com informações do release

**Versionamento Automático**:
- 🔴 **MAJOR**: PRs com `breaking`, `major`, `BREAKING CHANGE`
- 🟡 **MINOR**: PRs com `feat`, `feature`, `minor`
- 🟢 **PATCH**: Todos os outros casos (fix, docs, chore, etc.)

## 🔧 Configuração Necessária

### Secrets do GitHub

1. **NPM_TOKEN** (Obrigatório)
   - Token de automação do NPM
   - Configurar em: `Settings → Secrets and variables → Actions`

### Permissões do Repositório

- **Workflow permissions**: "Read and write permissions"
- **Allow GitHub Actions to create and approve pull requests**: ✅ Habilitado

## 📖 Documentação

Para informações detalhadas sobre configuração, uso e troubleshooting, consulte:

- **[RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md)**: Guia completo do workflow de release
- **[../PUBLISH.md](../PUBLISH.md)**: Guia geral de publicação (inclui método manual)

## 🔄 Fluxo de Trabalho Recomendado

1. **Desenvolvimento**:
   ```bash
   git checkout -b feat/nova-funcionalidade
   # Fazer alterações
   git commit -m "feat: add new functionality"
   git push origin feat/nova-funcionalidade
   ```

2. **Pull Request**:
   - Criar PR com título descritivo
   - Aguardar review e aprovação
   - Fazer merge (não squash)

3. **Release Automático**:
   - Workflow executa automaticamente
   - Versão é incrementada
   - Release é criado
   - Pacote é publicado no NPM

## 🚨 Troubleshooting

### Workflow não executa
- Verificar se PR foi merged (não apenas fechado)
- Confirmar que merge foi na branch `main`
- Verificar permissões do GitHub Actions

### Erro de publicação NPM
- Verificar validade do `NPM_TOKEN`
- Confirmar permissões de publicação no escopo `@codemastersolutions`

### Erro de build
- Testar compilação local: `npm run build`
- Verificar dependências: `npm ci`

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Automation Tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)