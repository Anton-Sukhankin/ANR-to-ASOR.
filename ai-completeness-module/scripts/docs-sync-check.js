function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '');
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

async function main() {
  // Dynamic imports work both in this ES-module host and in a standalone package.
  const fs = await import('node:fs');
  const path = await import('node:path');
  const moduleRoot = path.dirname(path.dirname(path.resolve(process.argv[1])));
  const registryPath = path.join(moduleRoot, 'docs', 'component_registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
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

main().catch(error => {
  console.error(`Documentation route check failed: ${error.message}`);
  process.exitCode = 1;
});
