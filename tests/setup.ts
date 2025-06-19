import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

// Configurações globais para todos os testes
beforeAll(async () => {
  // Configurações que devem ser executadas antes de todos os testes
  console.log('🧪 Iniciando suite de testes...');
});

afterAll(async () => {
  // Limpeza que deve ser executada após todos os testes
  console.log('✅ Suite de testes finalizada.');
});

beforeEach(async () => {
  // Configurações que devem ser executadas antes de cada teste
  // Por exemplo: limpar mocks, resetar estado, etc.
});

afterEach(async () => {
  // Limpeza que deve ser executada após cada teste
  // Por exemplo: limpar dados de teste, resetar mocks, etc.
});

// Configurações de timeout globais
process.env.NODE_ENV = 'test';

// Mock de console para testes mais limpos (opcional)
// global.console = {
//   ...console,
//   log: vi.fn(),
//   debug: vi.fn(),
//   info: vi.fn(),
//   warn: vi.fn(),
//   error: vi.fn(),
// };