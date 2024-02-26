#!/usr/bin/env node

import { program } from 'commander'
import { launcher_browser } from '../launch_browser.js';
import { SSHPasskeyManager } from '../class/SSHPasskeyCreate.js';

program
    .option('-f, --file <type>', 'output extra debugging')
    .option('-t, --title <type>', 'small pizza size')
    .option('-p, --page <type>', 'page from repository')

program.parse(process.argv);

const options = program.opts();

const passkey = await SSHPasskeyManager.passkeyFile(options)
launcher_browser(options.title, passkey, options.page)

//npx git-config -a renatoalcantara2022@gmail.com -n github-repository-authenticator
