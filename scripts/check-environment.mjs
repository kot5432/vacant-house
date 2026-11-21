import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const expected = '26.13.1'
const actual = process.versions.node
const packageFile = join(root, 'package.json')
const lockFile = join(root, 'package-lock.json')
const installedFolder = join(root, 'node_modules')
let failed = false

function report(ok, label, detail) {
  console.log(`${ok ? 'OK ' : 'NG '} ${label}: ${detail}`)
  if (!ok) failed = true
}

console.log('Toyama team development environment check (no package installation)')
report(actual === expected, 'Node.js', `current v${actual}; expected v${expected}`)
report(existsSync(packageFile), 'package.json', existsSync(packageFile) ? 'found' : 'not found; open the repository root')

if (existsSync(packageFile)) {
  try {
    const pkg = JSON.parse(readFileSync(packageFile, 'utf8'))
    report(pkg.engines?.node === expected, 'engine setting', `package.json engines.node=${pkg.engines?.node ?? '(missing)'}`)
  } catch (err) {
    report(false, 'package.json parsing', String(err))
  }
}

report(existsSync(lockFile), 'package-lock.json', existsSync(lockFile) ? 'found' : 'missing; a maintainer must first run npm install and commit the generated lockfile')
report(existsSync(installedFolder), 'node_modules', existsSync(installedFolder) ? 'present' : 'missing; run npm ci after lockfile is committed')

if (failed) {
  console.log('\nSetup is NOT complete. Check docs/START_DEVELOPMENT_20261121.md and Issue #51.')
  process.exitCode = 1
} else {
  console.log('\nBasic prerequisites found. Next run npm run typecheck and npm run build; this check does not prove the app works.')
}
