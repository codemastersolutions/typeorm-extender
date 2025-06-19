import { DataSource } from 'typeorm';
import fs from 'fs';
import path from 'path';

interface RunMigrationsOptions {
  config?: string;
}

export async function runMigrations(options: RunMigrationsOptions = {}): Promise<void> {
  console.log('🔄 Executando migrations...');
  
  let dataSource: DataSource | undefined;
  
  try {
    // Carregar configuração do arquivo
    const configPath = options.config || 'ormconfig.json';
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Arquivo de configuração não encontrado: ${configPath}`);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    dataSource = new DataSource(config);

    // Inicializar conexão
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('✅ Conexão com banco de dados estabelecida');
    }

    // Verificar migrations pendentes
    const pendingMigrations = await dataSource.showMigrations();
    
    if (!pendingMigrations) {
      console.log('ℹ️ Nenhuma migration pendente encontrada');
      return;
    }

    console.log(`📋 Encontradas ${pendingMigrations ? 'migrations pendentes' : 'nenhuma migration pendente'}`);

    // Executar migrations
    const executedMigrations = await dataSource.runMigrations({
      transaction: 'each' // Executa cada migration em uma transação separada
    });

    if (executedMigrations.length === 0) {
      console.log('ℹ️ Nenhuma migration foi executada - banco já está atualizado');
    } else {
      console.log(`✅ ${executedMigrations.length} migration(s) executada(s) com sucesso:`);
      executedMigrations.forEach(migration => {
        console.log(`  - ${migration.name}`);
      });
    }

  } catch (error) {
    console.error('❌ Erro ao executar migrations:', error);
    
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
      
      // Sugestões de solução baseadas no tipo de erro
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Sugestões:');
        console.log('- Verifique se o banco de dados está rodando');
        console.log('- Confirme as configurações de conexão');
      } else if (error.message.includes('authentication')) {
        console.log('\n💡 Sugestões:');
        console.log('- Verifique as credenciais do banco de dados');
        console.log('- Confirme usuário e senha nas variáveis de ambiente');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.log('\n💡 Sugestões:');
        console.log('- Crie o banco de dados manualmente');
        console.log('- Verifique o nome do banco nas configurações');
      }
    }
    
    process.exit(1);
  } finally {
    // Fechar conexão
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Conexão com banco de dados fechada');
    }
  }
}

// Função auxiliar para reverter migrations
export async function revertMigrations(options: RunMigrationsOptions & { steps?: number } = {}): Promise<void> {
  console.log('⏪ Revertendo migrations...');
  
  let dataSource: DataSource | undefined;
  
  try {
    // Carregar configuração do arquivo
    const configPath = options.config || 'ormconfig.json';
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Arquivo de configuração não encontrado: ${configPath}`);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    dataSource = new DataSource(config);

    // Inicializar conexão
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('✅ Conexão com banco de dados estabelecida');
    }

    // Reverter migrations
    const steps = options.steps || 1;
    
    for (let i = 0; i < steps; i++) {
      await dataSource.undoLastMigration({
        transaction: 'each'
      });
    }

    console.log(`✅ ${steps} migration(s) revertida(s) com sucesso`);

  } catch (error) {
    console.error('❌ Erro ao reverter migrations:', error);
    process.exit(1);
  } finally {
    // Fechar conexão
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Conexão com banco de dados fechada');
    }
  }
}

// Função para mostrar status das migrations
export async function showMigrationStatus(options: RunMigrationsOptions = {}): Promise<void> {
  console.log('📊 Verificando status das migrations...');
  
  let dataSource: DataSource | undefined;
  
  try {
    // Carregar configuração do arquivo
    const configPath = options.config || 'ormconfig.json';
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Arquivo de configuração não encontrado: ${configPath}`);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    dataSource = new DataSource(config);

    // Inicializar conexão
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    // Obter migrations executadas
    const executedMigrations = await dataSource.query(
      'SELECT * FROM migrations ORDER BY timestamp DESC'
    );

    // Verificar migrations pendentes
    const hasPendingMigrations = await dataSource.showMigrations();

    console.log('\n📋 Status das Migrations:');
    console.log('========================');
    
    if (executedMigrations.length > 0) {
      console.log('\n✅ Migrations Executadas:');
      executedMigrations.forEach((migration: any) => {
        console.log(`  - ${migration.name} (${new Date(migration.timestamp).toLocaleString()})`);
      });
    } else {
      console.log('\nℹ️ Nenhuma migration executada ainda');
    }

    if (hasPendingMigrations) {
      console.log('\n⏳ Existem migrations pendentes');
      console.log('Execute: npm run migration:run');
    } else {
      console.log('\n✅ Todas as migrations estão atualizadas');
    }

  } catch (error) {
    console.error('❌ Erro ao verificar status das migrations:', error);
    process.exit(1);
  } finally {
    // Fechar conexão
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  }
}