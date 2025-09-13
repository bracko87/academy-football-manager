#!/usr/bin/env node

import esbuild from 'esbuild'
import esbuildStylePlugin from 'esbuild-style-plugin'
import { rimraf } from 'rimraf'
import { copyFile, mkdir, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Clean build directory
await rimraf('build')

// Create build directory
await mkdir('build', { recursive: true })
await mkdir('build/src', { recursive: true })

// Copy public files
const publicDir = 'public'
const buildPublicDir = 'build/public'

await mkdir(buildPublicDir, { recursive: true })

const copyPublicFiles = async (src, dest) => {
  const entries = await readdir(src)
  
  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    const entryStat = await stat(srcPath)
    
    if (entryStat.isDirectory()) {
      await mkdir(destPath, { recursive: true })
      await copyPublicFiles(srcPath, destPath)
    } else {
      await copyFile(srcPath, destPath)
    }
  }
}

await copyPublicFiles(publicDir, buildPublicDir)

// Build React application
await esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outfile: 'build/src/bundle.js',
  format: 'esm',
  minify: process.argv.includes('--production'),
  sourcemap: process.argv.includes('--production') ? false : 'external',
  define: {
    'process.env.NODE_ENV': process.argv.includes('--production') ? '"production"' : '"development"'
  },
  plugins: [
    esbuildStylePlugin(),
  ],
  loader: {
    '.png': 'dataurl',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'dataurl',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file'
  },
  assetNames: 'assets/[name]-[hash]',
  publicPath: 'build/src/'
})

console.log('Build completed successfully!')
console.log('Output directory: build/')
