#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const process = require('process')
const { spawnSync } = require('child_process')

if (process.argv.length < 3) {
  console.error('Missing project name. Usage: npx create-react-demo <project name>')
  return 1
}

const directory = path.join(process.cwd(),process.argv[2])
fs.mkdir(directory, { recursive: true }, (err) => {
  if (err) throw err

  const execOptions = {
    stdio: 'inherit',
    shell: true,
    cwd: directory
  }
  spawnSync('npm init -y', execOptions)
  spawnSync('npm i --save react react-dom', execOptions)
  spawnSync('npm i -D babel-core babel-preset-env babel-preset-react parcel-bundler', execOptions)

  const packageJSON = JSON.parse(fs.readFileSync(`${directory}/package.json`))
  packageJSON.scripts['start'] = "parcel demo.html"
  fs.writeFileSync(`${directory}/package.json`, JSON.stringify(packageJSON, null, 2))

  const files = ['demo.html', 'demo.js', '.babelrc']
  files.forEach(f => {
    fs.copyFileSync(path.join(__dirname, f), path.join(directory, f))
  })
})