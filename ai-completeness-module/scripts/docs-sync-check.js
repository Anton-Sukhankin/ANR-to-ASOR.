const fs = require('fs');
const path = require('path');

const registryPath = path.join(process.cwd(), 'docs', 'component_registry.json');

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '');
}

function readRegistry() {
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function getComponentMatches(registry, changedFiles) {
  const matches = [];

  for (const [componentName, component] of Object.entries(registry.components)) {
    const relatedFiles = [
      ...(component.ui_files || []),
      ...(component.data_files || []),
      ...(component.primary_docs || []),
      ...(component.conditional_docs || []).map(item => item.path)
    ].map(normalizePath);

    const touched = changedFiles.filter(file => relatedFiles.includes(file));

    if (touched.length > 0) {
      matches.push({ componentName, component, touched });
    }
  }

  return matches;
}

function printUsage(registry) {
  console.log('Usage: node scripts/docs-sync-check.js <changed-file> [changed-file...]');
  console.log('');
  console.log('Known components:');
  Object.keys(registry.components).forEach(name => console.log(`- ${name}`));
}

function printMatches(matches) {
  for (const match of matches) {
    const { componentName, component, touched } = match;

    console.log(`\n${componentName}: ${component.title}`);
    console.log(`Changed files: ${touched.join(', ')}`);
    console.log('Primary docs to review:');
    (component.primary_docs || []).forEach(doc => console.log(`- ${doc}`));

    if ((component.conditional_docs || []).length > 0) {
      console.log('Conditional docs to consider:');
      component.conditional_docs.forEach(item => {
        console.log(`- ${item.path} (${item.review_when})`);
      });
    }
  }
}

function main() {
  const registry = readRegistry();
  const changedFiles = process.argv.slice(2).map(normalizePath);

  if (changedFiles.length === 0) {
    printUsage(registry);
    return;
  }

  const matches = getComponentMatches(registry, changedFiles);

  if (matches.length === 0) {
    console.log('No component matches found in docs/component_registry.json.');
    console.log('Check global docs if this change affects project structure, design tokens, or app-level behavior.');
    return;
  }

  printMatches(matches);
}

main();
