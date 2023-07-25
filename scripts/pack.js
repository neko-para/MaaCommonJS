import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['packages/cli/src/index.tsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist/scripts',
  sourcemap: true
})
