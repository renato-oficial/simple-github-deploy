#!/usr/bin/env node
import { logger } from "../lib/logger.js"
import { program } from 'commander'
import { exec } from "node:child_process"
import path from "node:path"

program
    .requiredOption('-f, --file <type>', 'email account from guithub')

program.parse(process.argv)

const options = program.opts();

const extname = path.extname(options.file)

try {
    if (extname) throw new Error("The private key does not contains extension")
    exec('eval "$(ssh-agent -s)"', (error, stdout, stderr) => {
        if (error) {
            throw new Error(error)
        }
        logger.info(stdout)
        logger.info(stderr)
    })


    exec(`ssh-add ${options.file}`, (error, stdout, stderr) => {
        if (error) {
            throw new Error(error)
        }
        logger.info(stdout)
        logger.info(stderr)
    })
} catch (e) {
    logger.error(e)
}
