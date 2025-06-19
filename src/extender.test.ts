import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TypeORMExtender, extender, ExtenderOptions } from './extender';

describe('TypeORMExtender', () => {
  let typeormExtender: TypeORMExtender;

  beforeEach(() => {
    typeormExtender = new TypeORMExtender();
  });

  describe('constructor', () => {
    it('should create an instance of TypeORMExtender', () => {
      expect(typeormExtender).toBeInstanceOf(TypeORMExtender);
    });

    it('should initialize with default configuration', () => {
      expect(typeormExtender).toBeDefined();
      const options = typeormExtender.getOptions();
      expect(options.debug).toBe(false);
      expect(options.prefix).toBe('typeorm-extender');
    });

    it('should initialize with custom configuration', () => {
      const customOptions: ExtenderOptions = {
        debug: true,
        prefix: 'custom-prefix'
      };
      const customExtender = new TypeORMExtender(customOptions);
      const options = customExtender.getOptions();
      expect(options.debug).toBe(true);
      expect(options.prefix).toBe('custom-prefix');
    });
  });

  describe('getOptions method', () => {
    it('should return current options', () => {
      const options = typeormExtender.getOptions();
      expect(options).toEqual({
        debug: false,
        prefix: 'typeorm-extender'
      });
    });

    it('should return a copy of options (not reference)', () => {
      const options1 = typeormExtender.getOptions();
      const options2 = typeormExtender.getOptions();
      expect(options1).not.toBe(options2); // Different objects
      expect(options1).toEqual(options2); // Same content
    });
  });

  describe('updateOptions method', () => {
    it('should update options partially', () => {
      typeormExtender.updateOptions({ debug: true });
      const options = typeormExtender.getOptions();
      expect(options.debug).toBe(true);
      expect(options.prefix).toBe('typeorm-extender'); // Should remain unchanged
    });

    it('should update multiple options', () => {
      typeormExtender.updateOptions({ debug: true, prefix: 'new-prefix' });
      const options = typeormExtender.getOptions();
      expect(options.debug).toBe(true);
      expect(options.prefix).toBe('new-prefix');
    });
  });

  describe('extend method', () => {
    it('should return success message', () => {
      const result = typeormExtender.extend();
      expect(result).toBe('TypeORM Extended Successfully');
    });

    it('should log debug message when debug is enabled', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      typeormExtender.updateOptions({ debug: true });
      typeormExtender.extend();
      
      expect(consoleSpy).toHaveBeenCalledWith('[typeorm-extender] TypeORM Extender initialized');
      
      consoleSpy.mockRestore();
    });

    it('should not log when debug is disabled', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      typeormExtender.extend();
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should use custom prefix in debug logs', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      typeormExtender.updateOptions({ debug: true, prefix: 'custom' });
      typeormExtender.extend();
      
      expect(consoleSpy).toHaveBeenCalledWith('[custom] TypeORM Extender initialized');
      
      consoleSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    it('should handle invalid options gracefully', () => {
      expect(() => {
        typeormExtender.updateOptions({} as any);
      }).not.toThrow();
    });

    it('should handle null options in updateOptions', () => {
      expect(() => {
        typeormExtender.updateOptions(null as any);
      }).not.toThrow();
    });
  });

  describe('integration tests', () => {
    it('should work with multiple calls', () => {
      const results = [
        typeormExtender.extend(),
        typeormExtender.extend(),
        typeormExtender.extend()
      ];

      expect(results).toEqual([
        'TypeORM Extended Successfully',
        'TypeORM Extended Successfully',
        'TypeORM Extended Successfully'
      ]);
    });

    it('should maintain state between calls', () => {
      typeormExtender.updateOptions({ debug: true });
      const options1 = typeormExtender.getOptions();
      typeormExtender.extend();
      const options2 = typeormExtender.getOptions();

      expect(options1.debug).toBe(options2.debug); // Estado deve ser mantido
    });
  });
});

describe('Default extender instance', () => {
  it('should export a default instance', () => {
    expect(extender).toBeInstanceOf(TypeORMExtender);
  });

  it('should have default configuration', () => {
    const options = extender.getOptions();
    expect(options.debug).toBe(false);
    expect(options.prefix).toBe('typeorm-extender');
  });

  it('should work independently from new instances', () => {
    const newInstance = new TypeORMExtender({ debug: true });
    
    expect(extender.getOptions().debug).toBe(false);
    expect(newInstance.getOptions().debug).toBe(true);
  });

  it('should be usable directly', () => {
    const result = extender.extend();
    expect(result).toBe('TypeORM Extended Successfully');
  });
});