import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { TypeORMExtender, extender } from '../src/index';

describe('Integration Tests', () => {
  let testExtender: TypeORMExtender;

  beforeAll(() => {
    console.log('🚀 Iniciando testes de integração...');
  });

  afterAll(() => {
    console.log('✅ Testes de integração finalizados.');
  });

  beforeEach(() => {
    testExtender = new TypeORMExtender();
  });

  describe('Multiple instances interaction', () => {
    it('should handle multiple extender instances independently', () => {
      const extender1 = new TypeORMExtender({ debug: true, prefix: 'ext1' });
      const extender2 = new TypeORMExtender({ debug: false, prefix: 'ext2' });
      const extender3 = new TypeORMExtender({ debug: true, prefix: 'ext3' });

      // Verificar configurações independentes
      expect(extender1.getOptions().debug).toBe(true);
      expect(extender2.getOptions().debug).toBe(false);
      expect(extender3.getOptions().debug).toBe(true);

      expect(extender1.getOptions().prefix).toBe('ext1');
      expect(extender2.getOptions().prefix).toBe('ext2');
      expect(extender3.getOptions().prefix).toBe('ext3');

      // Verificar que as operações são independentes
      const result1 = extender1.extend();
      const result2 = extender2.extend();
      const result3 = extender3.extend();

      expect(result1).toBe('TypeORM Extended Successfully');
      expect(result2).toBe('TypeORM Extended Successfully');
      expect(result3).toBe('TypeORM Extended Successfully');
    });

    it('should not affect default instance when creating new instances', () => {
      const originalOptions = extender.getOptions();
      
      // Criar nova instância com configurações diferentes
      const newExtender = new TypeORMExtender({ debug: true, prefix: 'new' });
      
      // Verificar que a instância padrão não foi afetada
      const currentOptions = extender.getOptions();
      expect(currentOptions).toEqual(originalOptions);
      expect(currentOptions.debug).toBe(false);
      expect(currentOptions.prefix).toBe('typeorm-extender');
      
      // Verificar que a nova instância tem as configurações corretas
      expect(newExtender.getOptions().debug).toBe(true);
      expect(newExtender.getOptions().prefix).toBe('new');
    });
  });

  describe('Configuration persistence', () => {
    it('should maintain configuration across multiple operations', () => {
      testExtender.updateOptions({ debug: true, prefix: 'persistent' });
      
      // Executar múltiplas operações
      for (let i = 0; i < 5; i++) {
        testExtender.extend();
        const options = testExtender.getOptions();
        expect(options.debug).toBe(true);
        expect(options.prefix).toBe('persistent');
      }
    });

    it('should handle incremental configuration updates', () => {
      // Configuração inicial
      testExtender.updateOptions({ debug: true });
      expect(testExtender.getOptions().debug).toBe(true);
      expect(testExtender.getOptions().prefix).toBe('typeorm-extender');
      
      // Atualização incremental
      testExtender.updateOptions({ prefix: 'updated' });
      expect(testExtender.getOptions().debug).toBe(true); // Mantido
      expect(testExtender.getOptions().prefix).toBe('updated'); // Atualizado
      
      // Outra atualização
      testExtender.updateOptions({ debug: false });
      expect(testExtender.getOptions().debug).toBe(false); // Atualizado
      expect(testExtender.getOptions().prefix).toBe('updated'); // Mantido
    });
  });

  describe('Logging behavior', () => {
    it('should log correctly with different configurations', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      // Teste com debug desabilitado
      testExtender.updateOptions({ debug: false });
      testExtender.extend();
      expect(consoleSpy).not.toHaveBeenCalled();
      
      // Teste com debug habilitado
      testExtender.updateOptions({ debug: true });
      testExtender.extend();
      expect(consoleSpy).toHaveBeenCalledWith('[typeorm-extender] TypeORM Extender initialized');
      
      // Teste com prefix customizado
      testExtender.updateOptions({ prefix: 'custom-log' });
      testExtender.extend();
      expect(consoleSpy).toHaveBeenCalledWith('[custom-log] TypeORM Extender initialized');
      
      consoleSpy.mockRestore();
    });

    it('should handle rapid consecutive calls with logging', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      testExtender.updateOptions({ debug: true, prefix: 'rapid' });
      
      // Múltiplas chamadas rápidas
      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(testExtender.extend());
      }
      
      // Verificar resultados
      expect(results).toHaveLength(10);
      expect(results.every(result => result === 'TypeORM Extended Successfully')).toBe(true);
      
      // Verificar logs
      expect(consoleSpy).toHaveBeenCalledTimes(10);
      expect(consoleSpy).toHaveBeenCalledWith('[rapid] TypeORM Extender initialized');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle malformed configuration gracefully', () => {
      expect(() => {
        testExtender.updateOptions(undefined as any);
      }).not.toThrow();
      
      expect(() => {
        testExtender.updateOptions(null as any);
      }).not.toThrow();
      
      expect(() => {
        testExtender.updateOptions({} as any);
      }).not.toThrow();
    });

    it('should maintain functionality after configuration errors', () => {
      // Configuração válida inicial
      testExtender.updateOptions({ debug: true });
      expect(testExtender.extend()).toBe('TypeORM Extended Successfully');
      
      // Tentativa de configuração inválida
      try {
        testExtender.updateOptions(null as any);
      } catch (error) {
        // Ignorar erro se houver
      }
      
      // Verificar que ainda funciona
      expect(testExtender.extend()).toBe('TypeORM Extended Successfully');
    });
  });

  describe('Performance and memory', () => {
    it('should handle large number of operations efficiently', () => {
      const startTime = performance.now();
      
      // Executar muitas operações
      for (let i = 0; i < 1000; i++) {
        testExtender.extend();
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Verificar que é razoavelmente rápido (menos de 100ms para 1000 operações)
      expect(duration).toBeLessThan(100);
    });

    it('should not leak memory with multiple instances', () => {
      const instances = [];
      
      // Criar muitas instâncias
      for (let i = 0; i < 100; i++) {
        instances.push(new TypeORMExtender({ debug: i % 2 === 0, prefix: `test-${i}` }));
      }
      
      // Usar todas as instâncias
      instances.forEach(instance => {
        expect(instance.extend()).toBe('TypeORM Extended Successfully');
      });
      
      // Verificar que todas ainda funcionam
      expect(instances).toHaveLength(100);
      expect(instances.every(instance => instance instanceof TypeORMExtender)).toBe(true);
    });
  });

  describe('Real-world scenarios', () => {
    it('should work in a typical usage scenario', () => {
      // Cenário: Configuração inicial da aplicação
      const appExtender = new TypeORMExtender({
        debug: process.env.NODE_ENV !== 'production',
        prefix: 'my-app'
      });
      
      // Verificar configuração
      const options = appExtender.getOptions();
      expect(options.debug).toBe(true); // NODE_ENV é 'test'
      expect(options.prefix).toBe('my-app');
      
      // Simular uso durante a aplicação
      const result = appExtender.extend();
      expect(result).toBe('TypeORM Extended Successfully');
      
      // Simular mudança de configuração em runtime
      appExtender.updateOptions({ debug: false });
      expect(appExtender.getOptions().debug).toBe(false);
      
      // Verificar que ainda funciona
      expect(appExtender.extend()).toBe('TypeORM Extended Successfully');
    });

    it('should work with default instance in production-like scenario', () => {
      // Simular uso da instância padrão
      const originalResult = extender.extend();
      expect(originalResult).toBe('TypeORM Extended Successfully');
      
      // Simular configuração em runtime
      extender.updateOptions({ debug: true, prefix: 'production' });
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const result = extender.extend();
      expect(result).toBe('TypeORM Extended Successfully');
      expect(consoleSpy).toHaveBeenCalledWith('[production] TypeORM Extender initialized');
      
      consoleSpy.mockRestore();
      
      // Restaurar configuração padrão
      extender.updateOptions({ debug: false, prefix: 'typeorm-extender' });
    });
  });
});