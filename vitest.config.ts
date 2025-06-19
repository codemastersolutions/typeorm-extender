import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Ambiente de teste
    environment: 'node',
    
    // Padrões de arquivos de teste
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    
    // Excluir arquivos
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ],
    
    // Configurações de cobertura
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts' // Arquivo de barrel, geralmente só re-exporta
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Configurações globais
    globals: true,
    
    // Timeout para testes
    testTimeout: 10000,
    
    // Configurações de setup
    setupFiles: ['./tests/setup.ts'],
    
    // Configurações de relatório
    reporters: ['verbose', 'json', 'html'],
    
    // Configurações de watch
    watch: false,
    
    // Configurações de pool
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true
      }
    }
  },
  
  // Configurações de resolução de módulos
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  
  // Configurações do esbuild para TypeScript
  esbuild: {
    target: 'es2023'
  }
});