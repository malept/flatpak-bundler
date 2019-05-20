/* eslint-env mocha */

const flatpakBundler = require('..')

const assert = require('assert')
const fs = require('fs-extra')
const path = require('path')

const outputPath = path.join(__dirname, 'out')
const refsPath = path.join(__dirname, '..', 'refs')
const binPath = path.join(outputPath, 'hello')
const flatpakPath = path.join(outputPath, 'hello.flatpak')
const runtimeRefPath = path.join(refsPath, 'freedesktop-runtime-1.4.flatpakref')

describe('flatpak-bundler', function () {
  describe('bundle', function () {
    this.timeout(30000)

    beforeEach(async () => {
      await fs.remove(outputPath)
      await fs.ensureDir(outputPath)
      await fs.outputFile(binPath,
        `#!/bin/bash
        echo "Hello, world!"`, { mode: 0o755 }
      )
    })

    it('creates a flatpak', async () => {
      await flatpakBundler.bundle({
        id: 'org.world.Hello',
        runtime: 'org.freedesktop.Platform',
        runtimeVersion: '1.4',
        runtimeFlatpakref: runtimeRefPath,
        sdk: 'org.freedesktop.Sdk',
        files: [
          [binPath, '/bin/hello']
        ]
      }, {
        bundlePath: flatpakPath
      })
      assert(await fs.pathExists(flatpakPath))
    })

    it('accepts dash variants', async () => {
      await flatpakBundler.bundle({
        'id': 'org.world.Hello',
        'runtime': 'org.freedesktop.Platform',
        'runtime-version': '1.4',
        'runtime-flatpakref': runtimeRefPath,
        'sdk': 'org.freedesktop.Sdk',
        'files': [
          [binPath, '/bin/hello']
        ]
      }, {
        'bundle-path': flatpakPath
      })
      assert(await fs.pathExists(flatpakPath))
    })

    it('recognizes a node style arch', async () => {
      await flatpakBundler.bundle({
        id: 'org.world.Hello',
        runtime: 'org.freedesktop.Platform',
        runtimeVersion: '1.4',
        runtimeFlatpakref: runtimeRefPath,
        sdk: 'org.freedesktop.Sdk',
        files: [
          [binPath, '/bin/hello']
        ]
      }, {
        arch: 'x64',
        bundlePath: flatpakPath
      })
      assert(await fs.pathExists(flatpakPath))
    })

    afterEach(async () => fs.remove(outputPath))
  })
})
