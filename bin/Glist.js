#!/usr/bin/env node

try {
    if (extname) throw new Error("The private key does not contains extension")
    exec('ssh-agent -l', (error, stdout, stderr) => {
        if (error) {
            throw new Error(error)
        }
        logger.info(stdout)
        logger.info(stderr)
    })
} catch (e) {
    logger.error(e)
}