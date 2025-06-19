#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Gera changelog baseado em conventional commits
 */
function generateChangelog() {
  try {
    // Tenta obter a última tag
    let lastTag;
    try {
      lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (error) {
      lastTag = null;
    }

    // Obtém os commits desde a última tag ou desde o início
    const gitLogCommand = lastTag 
      ? `git log ${lastTag}..HEAD --pretty=format:"%h %s"`
      : 'git log --pretty=format:"%h %s"';
    
    const commits = execSync(gitLogCommand, { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [hash, ...messageParts] = line.split(' ');
        return {
          hash: hash.replace(/"/g, ''),
          message: messageParts.join(' ').replace(/"/g, '')
        };
      });

    if (commits.length === 0) {
      console.log('## Changes\n\nNo changes found.');
      return;
    }

    // Categoriza os commits
    const categories = {
      'breaking': { title: '⚠ BREAKING CHANGES', commits: [] },
      'feat': { title: '✨ Features', commits: [] },
      'fix': { title: '🐛 Bug Fixes', commits: [] },
      'perf': { title: '⚡ Performance Improvements', commits: [] },
      'refactor': { title: '♻️ Code Refactoring', commits: [] },
      'docs': { title: '📚 Documentation', commits: [] },
      'style': { title: '💄 Styles', commits: [] },
      'test': { title: '✅ Tests', commits: [] },
      'build': { title: '👷 Build System', commits: [] },
      'ci': { title: '🔧 Continuous Integration', commits: [] },
      'chore': { title: '🔨 Chores', commits: [] },
      'revert': { title: '⏪ Reverts', commits: [] },
      'other': { title: '📦 Other Changes', commits: [] }
    };

    for (const commit of commits) {
      const { hash, message } = commit;
      
      // Verifica por BREAKING CHANGE
      if (message.includes('BREAKING CHANGE') || message.includes('!:')) {
        categories.breaking.commits.push({ hash, message });
        continue;
      }
      
      // Verifica por tipos de commit
      let categorized = false;
      for (const [type, category] of Object.entries(categories)) {
        if (type === 'breaking' || type === 'other') continue;
        
        const regex = new RegExp(`^${type}(\\(.+\\))?!?:`, 'i');
        if (regex.test(message)) {
          category.commits.push({ hash, message });
          categorized = true;
          break;
        }
      }
      
      // Se não foi categorizado, adiciona em "other"
      if (!categorized) {
        categories.other.commits.push({ hash, message });
      }
    }

    // Gera o changelog
    let changelog = '## Changes\n\n';
    
    for (const [type, category] of Object.entries(categories)) {
      if (category.commits.length > 0) {
        changelog += `### ${category.title}\n\n`;
        
        for (const commit of category.commits) {
          // Remove o prefixo do tipo do commit para exibição mais limpa
          let cleanMessage = commit.message;
          const typeMatch = cleanMessage.match(/^(\w+)(\(.+\))?!?:\s*(.+)/);
          if (typeMatch) {
            const scope = typeMatch[2] || '';
            const description = typeMatch[3];
            cleanMessage = scope ? `${scope}: ${description}` : description;
          }
          
          changelog += `- ${cleanMessage} ([${commit.hash}])\n`;
        }
        
        changelog += '\n';
      }
    }

    // Remove a última quebra de linha extra
    changelog = changelog.trim();
    
    console.log(changelog);
  } catch (error) {
    console.error('Erro ao gerar changelog:', error.message);
    console.log('## Changes\n\nError generating changelog.');
  }
}

generateChangelog();