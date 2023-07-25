import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['packages/cli/src/index.tsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist/scripts',
  sourcemap: true,
  external: ['koffi'],
  banner: {
    js: 'const require = (await import("node:module")).createRequire(import.meta.url)'
  }
})
