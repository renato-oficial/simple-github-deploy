#!/usr/bin/env node

import { logger } from "../lib/logger.js"
import { spawn } from "node:child_process"

try {
    spawn('ssh-add', ['-l'], { shell: true })
} catch (e) {
    logger.error(e)
}