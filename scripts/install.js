import fs from 'fs'

const target = process.argv[2] ?? 'win-x64'

fs.rmSync('MaaCommonJS', {
  recursive: true,
  force: true
})

fs.mkdirSync('MaaCommonJS')

fs.cpSync('1999', 'MaaCommonJS/1999', {
  recursive: true
})

fs.cpSync('bin', 'MaaCommonJS/bin', {
  recursive: true
})

fs.cpSync('dist', 'MaaCommonJS/dist', {
  recursive: true
})

fs.copyFileSync('package.json', 'MaaCommonJS/package.json')

const nodeExe = `node/fetched-v18.5.0-${target}`
if (target.startsWith('win')) {
  fs.copyFileSync(nodeExe, 'MaaCommonJS/node.exe')
} else {
  fs.copyFileSync(nodeExe, 'MaaCommonJS/node')
}

fs.copyFileSync('preset.json', 'MaaCommonJS/preset.json')

fs.copyFileSync('MaaCommonJS.bat', 'MaaCommonJS/MaaCommonJS.bat')
fs.copyFileSync('MaaCommonJS.sh', 'MaaCommonJS/MaaCommonJS.sh')
