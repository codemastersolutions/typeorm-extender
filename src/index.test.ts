import { describe, it, expect } from 'vitest';
import { TypeORMExtender, extender, ExtenderOptions, VERSION } from './index';

describe('Index Module', () => {
  describe('exports', () => {
    it('should export TypeORMExtender class', () => {
      expect(TypeORMExtender).toBeDefined();
      expect(typeof TypeORMExtender).toBe('function');
    });

    it('should export extender instance', () => {
      expect(extender).toBeDefined();
      expect(extender).toBeInstanceOf(TypeORMExtender);
    });

    it('should export ExtenderOptions interface (implicitly)', () => {
      // TypeScript interfaces don't exist at runtime, but we can test usage
      const options: ExtenderOptions = { debug: true, prefix: 'test' };
      expect(options).toBeDefined();
    });

    it('should export VERSION constant', () => {
      expect(VERSION).toBeDefined();
      expect(typeof VERSION).toBe('string');
    });

    it('should have correct VERSION format', () => {
      // Verifica se a versão segue o padrão semver (x.y.z)
      const semverRegex = /^\d+\.\d+\.\d+$/;
      expect(VERSION).toMatch(semverRegex);
    });
  });

  describe('TypeORMExtender instantiation', () => {
    it('should be able to create an instance of TypeORMExtender', () => {
      const instance = new TypeORMExtender();
      expect(instance).toBeInstanceOf(TypeORMExtender);
    });

    it('should have extend method available', () => {
      const instance = new TypeORMExtender();
      expect(typeof instance.extend).toBe('function');
    });

    it('should have getOptions method available', () => {
      const instance = new TypeORMExtender();
      expect(typeof instance.getOptions).toBe('function');
    });

    it('should have updateOptions method available', () => {
      const instance = new TypeORMExtender();
      expect(typeof instance.updateOptions).toBe('function');
    });
  });

  describe('module integration', () => {
    it('should work as expected when imported', () => {
      const service = new TypeORMExtender();
      const result = service.extend();
      
      expect(result).toBe('TypeORM Extended Successfully');
      expect(VERSION).toBe('0.0.1');
    });

    it('should work with default extender instance', () => {
      const result = extender.extend();
      expect(result).toBe('TypeORM Extended Successfully');
    });

    it('should maintain consistency in VERSION export', () => {
      expect(VERSION).toBe('0.0.1');
      expect(typeof VERSION).toBe('string');
    });
  });

  describe('TypeScript types', () => {
    it('should have proper TypeScript support', () => {
      // Este teste verifica se os tipos estão sendo exportados corretamente
      const service: TypeORMExtender = new TypeORMExtender();
      const defaultInstance: TypeORMExtender = extender;
      const version: string = VERSION;
      const options: ExtenderOptions = { debug: true };
      
      expect(service).toBeDefined();
      expect(defaultInstance).toBeDefined();
      expect(version).toBeDefined();
      expect(options).toBeDefined();
    });
  });
});