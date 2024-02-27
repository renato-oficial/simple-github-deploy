#!/usr/bin/env node

import { logger } from "../lib/logger.js"
import { exec } from "node:child_process"

try {
    exec('ssh-add -l', (error, stdout, stderr) => {
        if (error) {
            throw new Error(error)
        }
        logger.info(stdout)
        logger.info(stderr)
    })
} catch (e) {
    logger.error(e)
}