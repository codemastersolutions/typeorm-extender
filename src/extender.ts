/**
 * TypeORM Extender Core
 * Main functionality for extending TypeORM capabilities
 */

export interface ExtenderOptions {
  debug?: boolean;
  prefix?: string;
}

export class TypeORMExtender {
  private options: ExtenderOptions;

  constructor(options: ExtenderOptions = {}) {
    this.options = {
      debug: false,
      prefix: 'typeorm-extender',
      ...options
    };
  }

  /**
   * Get current configuration
   */
  getOptions(): ExtenderOptions {
    return { ...this.options };
  }

  /**
   * Update configuration
   */
  updateOptions(newOptions: Partial<ExtenderOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Log debug information if debug mode is enabled
   */
  private log(message: string): void {
    if (this.options.debug) {
      console.log(`[${this.options.prefix}] ${message}`);
    }
  }

  /**
   * Example method - extend as needed
   */
  extend(): string {
    this.log('TypeORM Extender initialized');
    return 'TypeORM Extended Successfully';
  }
}

// Export default instance
export const extender = new TypeORMExtender();