# Testes - TypeORM Extender

Este diretório contém a configuração e arquivos de teste para o projeto TypeORM Extender usando **Vitest**.

## 🧪 Sobre o Vitest

O Vitest é um framework de testes moderno e rápido para projetos JavaScript/TypeScript, especialmente otimizado para projetos que usam Vite. Principais características:

- ⚡ **Extremamente rápido** - Execução paralela e hot reload
- 🔧 **Configuração mínima** - Funciona out-of-the-box com TypeScript
- 🎯 **API compatível com Jest** - Fácil migração e aprendizado
- 📊 **Cobertura integrada** - Relatórios de cobertura com V8
- 🔍 **Watch mode inteligente** - Re-executa apenas testes afetados

## 📁 Estrutura de Testes

```
tests/
├── README.md          # Este arquivo
├── setup.ts          # Configurações globais de teste
└── ...

src/
├── extender.test.ts  # Testes para extender.ts
├── index.test.ts     # Testes para index.ts
└── ...
```

## 🚀 Scripts Disponíveis

### Execução de Testes

```bash
# Executar todos os testes uma vez
npm test

# Executar testes em modo watch (re-executa ao salvar)
npm run test:watch

# Executar testes com interface gráfica
npm run test:ui
```

### Cobertura de Código

```bash
# Gerar relatório de cobertura
npm run test:coverage

# Gerar cobertura em modo watch
npm run test:coverage:watch
```

## 📊 Métricas de Cobertura

O projeto está configurado com os seguintes thresholds de cobertura:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## 🔧 Configuração

A configuração do Vitest está no arquivo `vitest.config.ts` na raiz do projeto. Principais configurações:

### Ambiente de Teste
- **Environment**: Node.js
- **Globals**: Habilitado (não precisa importar `describe`, `it`, `expect`)
- **TypeScript**: Suporte nativo

### Padrões de Arquivos
- Testes em `src/**/*.{test,spec}.{js,ts}`
- Testes em `tests/**/*.{test,spec}.{js,ts}`

### Cobertura
- **Provider**: V8 (nativo do Node.js)
- **Formatos**: Text, JSON, HTML
- **Exclusões**: `node_modules`, `dist`, arquivos de configuração

## 📝 Convenções de Teste

### Estrutura de Teste

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  });

  describe('method or feature', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = component.method(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Mocking

```typescript
import { vi } from 'vitest';

// Mock de função
const mockFn = vi.fn();

// Mock de console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

// Restaurar mock
consoleSpy.mockRestore();
```

### Testes Assíncronos

```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

## 🎯 Boas Práticas

### 1. **Nomenclatura Clara**
- Use descrições descritivas para `describe` e `it`
- Siga o padrão: "should [expected behavior] when [condition]"

### 2. **Arrange-Act-Assert**
- **Arrange**: Configure os dados de teste
- **Act**: Execute a ação sendo testada
- **Assert**: Verifique o resultado

### 3. **Isolamento de Testes**
- Cada teste deve ser independente
- Use `beforeEach`/`afterEach` para setup/cleanup
- Restaure mocks após uso

### 4. **Cobertura Significativa**
- Teste casos de sucesso e erro
- Teste edge cases
- Foque na lógica de negócio

### 5. **Performance**
- Evite testes desnecessariamente lentos
- Use mocks para dependências externas
- Mantenha testes focados e específicos

## 🔍 Debugging

### Executar Teste Específico

```bash
# Por nome do arquivo
npx vitest extender.test.ts

# Por padrão
npx vitest --grep "should extend functionality"
```

### Debug com VSCode

1. Adicione breakpoints no código
2. Use a configuração de debug do VSCode
3. Ou execute: `node --inspect-brk ./node_modules/vitest/vitest.mjs run`

## 📈 Relatórios

### Cobertura HTML
Após executar `npm run test:coverage`, abra `coverage/index.html` no navegador.

### Relatório de Testes
O Vitest gera relatórios em HTML automaticamente. Execute:

```bash
npx vite preview --outDir html
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de importação de módulos**
   - Verifique se o `vitest.config.ts` está configurado corretamente
   - Confirme que as extensões `.js` estão sendo usadas nas importações

2. **Testes não encontrados**
   - Verifique os padrões de arquivo em `vitest.config.ts`
   - Confirme que os arquivos seguem a convenção `*.test.ts` ou `*.spec.ts`

3. **Problemas de TypeScript**
   - Verifique se `@types/node` está instalado
   - Confirme que o `tsconfig.json` está configurado corretamente

### Logs de Debug

```bash
# Executar com logs detalhados
npx vitest --reporter=verbose

# Executar com debug do Node.js
DEBUG=vitest* npm test
```

---

**Documentação oficial**: [Vitest](https://vitest.dev/)