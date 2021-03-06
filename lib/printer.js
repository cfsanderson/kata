const chalk = require('chalk')

const printer = input => {
  const log = l => console.log('  '.repeat(Math.max(tabs, 0)) + l)
  let tabs = 0
  input.split(/<:LF:>|\n/).forEach(line => {
    line.replace(
      /(<(\w+):(.*):(.*)>)?(.*)/,
      (m, _, term, term2, term3, msg) => {
        switch (term) {
          case 'ERROR':
            log(chalk.red.bold(msg))
            break
          case 'PASSED':
            log(chalk.green(msg).replace('Test Passed:', m => chalk.bold(m)))
            break
          case 'FAILED':
            log(chalk.red(msg))
            break
          case 'DESCRIBE':
            log(chalk.yellow('\nDescribe ' + chalk.bold(msg)))
            tabs++
            break
          case 'IT':
            log(chalk.blue('It ' + chalk.bold(msg)))
            tabs++
            break
          case 'LOG':
            log(chalk.bold.white(msg))
            break
          case 'COMPLETEDIN':
            tabs--
            if (msg.length > 0) {
              log(chalk.grey('Completed in ' + chalk.bold(msg) + 'ms'))
            }
            break
          default:
            log(msg)
            break
        }
      }
    )
  })
}

module.exports = printer
