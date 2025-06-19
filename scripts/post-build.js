#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo CLI compilado
const cliPath = path.join(__dirname, '..', 'dist', 'cli', 'index.js');

// Verificar se o arquivo existe
if (fs.existsSync(cliPath)) {
  // Ler o conteúdo do arquivo
  let content = fs.readFileSync(cliPath, 'utf8');
  
  // Verificar se já tem shebang
  if (!content.startsWith('#!/usr/bin/env node')) {
    // Adicionar shebang no início
    content = '#!/usr/bin/env node\n' + content;
    
    // Escrever o arquivo atualizado
    fs.writeFileSync(cliPath, content);
    console.log('✅ Shebang adicionado ao arquivo CLI compilado');
  } else {
    console.log('✅ Shebang já presente no arquivo CLI');
  }
  
  // Tornar o arquivo executável
  fs.chmodSync(cliPath, '755');
  console.log('✅ Permissões de execução definidas para o arquivo CLI');
} else {
  console.error('❌ Arquivo CLI compilado não encontrado:', cliPath);
  process.exit(1);
}