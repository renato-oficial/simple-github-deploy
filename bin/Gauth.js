#!/usr/bin/env node

import { program } from 'commander'
import { launcher_browser } from '../launch_browser.js';
import { SSHPasskeyManager } from '../class/SSHPasskeyCreate.js';
import { logger } from '../lib/logger.js';

program
    .requiredOption('-f, --file <type>', 'output extra debugging')
    .requiredOption('-t, --title <type>', 'small pizza size')
    .requiredOption('-p, --page <type>', 'page from repository')

program.parse(process.argv);

const options = program.opts();


try {
    const passkey = await SSHPasskeyManager.passkeyFile(options)
    launcher_browser(options.title, passkey, options.page)
} catch (error) {
    logger.error(error)
}

//npx git-auth  -f /home/renato/.ssh/repo-teste -t "repo-teste" -p https://github.com/renato-oficial/repo-teste
