#!/usr/bin/env node

import { program } from 'commander'
import { SSHAgentConfig } from '../class/SSHAgentConfig.js'

program
    .name('GUIPass-Util')
    .description('GUIPass set authorization from guithub account')
    .version('0.1.0')

program
    .requiredOption('-a, --account <type>', 'email account from guithub')
    .option('-n, --name <type>', 'name of key ssh file')

program.parse(process.argv)

const options = program.opts();
if (options.account) console.log(`- ${options.account}`)
if (options.name) console.log(`- ${options.name}`)


const sshAgentConfig = new SSHAgentConfig(options.account, options.name)
sshAgentConfig.passkeyGenerate()

// git remote add origin git@github.com:renato-oficial/repo-teste.git
// git push -u origin main

//npx git-config  -a renatoalcantara2022@gmail.com -name repo-teste