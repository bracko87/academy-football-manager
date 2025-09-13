#!/usr/bin/env node

import esbuild from 'esbuild'
import esbuildStylePlugin from 'esbuild-style-plugin'
import { copyFile, mkdir, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { watch } from 'chokidar'
import { serve } from 'esbuild-serve'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Copy public files
const copyPublicFiles = async () => {
  const publicDir = 'public'
  const buildPublicDir = 'build/public'

  await mkdir(buildPublicDir, { recursive: true })

  const copyRecursive = async (src, dest) => {
    const entries = await readdir(src)
    
    for (const entry of entries) {
      const srcPath = join(src, entry)
      const destPath = join(dest, entry)
      const entryStat = await stat(srcPath)
      
      if (entryStat.isDirectory()) {
        await mkdir(destPath, { recursive: true })
        await copyRecursive(srcPath, destPath)
      } else {
        await copyFile(srcPath, destPath)
      }
    }
  }

  try {
    await copyRecursive(publicDir, buildPublicDir)
    console.log('Public files copied')
  } catch (error) {
    console.log('Public files copy skipped (directory may not exist yet)')
  }
}

// Initial build
console.log('Building for development...')
copyPublicFiles()

// Build React application
const build = async () => {
  try {
    await esbuild.build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outfile: 'build/src/bundle.js',
      format: 'esm',
      sourcemap: 'external',
      define: {
        'process.env.NODE_ENV': '"development"'
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
    console.log('Development build completed')
  } catch (error) {
    console.error('Build error:', error)
  }
}

// Initial build
build()

// Watch for changes
const watcher = watch(['src/**/*', 'public/**/*'])

watcher.on('change', (path) => {
  console.log(`File changed: ${path}`)
  copyPublicFiles()
  build()
})

console.log('Watching for file changes...')
console.log('Development server running at http://localhost:3000')
