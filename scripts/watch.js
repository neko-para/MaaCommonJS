import esbuild from 'esbuild'

const ctx = await esbuild.context({
  entryPoints: ['packages/cli/src/index.tsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist/scripts',
  sourcemap: true,
  banner: {
    js: `import * as url from 'url';const require = (await import("node:module")).createRequire(import.meta.url);const __filename = url.fileURLToPath(import.meta.url);const __dirname = url.fileURLToPath(new URL('.', import.meta.url));`
  }
})

await ctx.watch()
