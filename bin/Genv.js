#!/usr/bin/env node
import { logger } from "../lib/logger.js"
import { program } from 'commander'
import { exec } from "node:child_process"
import path from "node:path"
import { SSHService } from "../class/SSHService.js"

program
    .requiredOption('-f, --file <type>', 'email account from guithub')

program.parse(process.argv)

const options = program.opts();

const extname = path.extname(options.file)

try {
    if (extname) throw new Error("The private key does not contains extension")
    const sshservice = new SSHService()
    sshservice.sshAgent()
    sshservice.sshClear()
    sshservice.sshAdd(options.file)
} catch (e) {
    logger.error(e)
}
