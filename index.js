const whichpm = require('which-pm')
const program = require('commander')
const pathExists = require('path-exists')

program
  .version('1.0.0')
  .usage('<path ...>')
  .parse(process.argv)

const path = program.args[0] || process.cwd()

pathExists(path)
  .then(exists => {
    if (exists) {
      whichpm(program.args[0] || process.cwd())
        .then(pm => console.log(pm))
        .catch(err => console.error('err ' + err))
    } else {
      console.error('err ' + exists)
    }
  })
  .catch(err => console.error('err ' + err))
