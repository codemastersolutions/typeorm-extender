#!/usr/bin/env node

const { execSync } = require('child_process');
const semver = require('semver');

/**
 * Determina o tipo de bump de versão baseado em conventional commits
 * desde a última tag ou desde o início do repositório
 */
function getVersionBump() {
  try {
    // Tenta obter a última tag
    let lastTag;
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (error) {
      // Se não há tags, usa todos os commits
      lastTag = null;
    }

    // Obtém os commits desde a última tag ou desde o início
    const gitLogCommand = lastTag 
      ? `git log ${lastTag}..HEAD --oneline`
      : 'git log --oneline';
    
    const commits = execSync(gitLogCommand, { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.trim());

    if (commits.length === 0) {
      console.log('patch'); // Default para patch se não há commits
      return;
    }

    let hasMajor = false;
    let hasMinor = false;
    let hasPatch = false;

    for (const commit of commits) {
      const message = commit.substring(commit.indexOf(' ') + 1);
      
      // Verifica por BREAKING CHANGE
      if (message.includes('BREAKING CHANGE') || message.includes('!:')) {
        hasMajor = true;
        break;
      }
      
      // Verifica por tipos de commit que indicam major (com !)
      if (/^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)!:/.test(message)) {
        hasMajor = true;
        break;
      }
      
      // Verifica por feat (minor)
      if (/^feat(\(.+\))?:/.test(message)) {
        hasMinor = true;
      }
      
      // Verifica por outros tipos (patch)
      if (/^(fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?:/.test(message)) {
        hasPatch = true;
      }
    }

    // Determina o tipo de bump baseado na prioridade
    if (hasMajor) {
      console.log('major');
    } else if (hasMinor) {
      console.log('minor');
    } else if (hasPatch) {
      console.log('patch');
    } else {
      // Se nenhum padrão conventional commit foi encontrado, usa patch como padrão
      console.log('patch');
    }
  } catch (error) {
    console.error('Erro ao determinar bump de versão:', error.message);
    console.log('patch'); // Fallback para patch em caso de erro
  }
}

getVersionBump();