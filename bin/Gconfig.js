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

//npx git-auth -f /home/renato/.ssh/github-repository-authenticator.pub -t GitAuthenticator -p https://github.com/renato-oficial/github-repository-authenticator