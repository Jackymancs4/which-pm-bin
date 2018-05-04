const whichpm = require('which-pm')
const program = require('commander')
const pathExists = require('path-exists')
const chalk = require('chalk')

const print = {
  success: (text) => {
    console.log(chalk.green(text))
  },
  warning: (text) => {
    console.log(chalk.yellow(text))
  },
  error: (text) => {
    console.log(chalk.red(text))
  }}

program
  .version('1.0.0')
  .usage('<path ...>')
  .parse(process.argv)

const path = program.args[0] || process.cwd()

pathExists(path)
  .then(exists => {
    if (exists) {
      whichpm(program.args[0] || process.cwd())
        .then(pm => {
          print.success('Great!')
          console.log('Package manager: ' + pm.name)
          if (pm.version) {
            console.log('Version: ' + pm.version)
          }
        })
        .catch(err => {
          print.error('An error occurred:')
          console.error(err)
        })
    } else {
      print.error('An error occurred:')
      console.error('Folder not found')
    }
  })
  .catch(err => {
    print.error('An error occurred:')
    console.error(err)
  })
