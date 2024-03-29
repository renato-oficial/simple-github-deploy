import { spawn } from "node:child_process"
import { logger } from "../lib/logger.js"

class SSHService {

    sshClear = () => {
        try {
            const result = spawn('ssh-add ', ['-D'], { shell: true })
            result.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

        } catch (error) {
            logger.error(error)
        }
    }

    sshAgent = () => {
        try {
            const result = spawn('eval', ['"$(ssh-agent -s)"'], { shell: true })
            result.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            result.stderr.on('data', (data) => {
                throw new Error(data)
            });

        } catch (error) {
            logger.error(error)
        }
    }


    sshAdd = (file) => {
        try {
            const result = spawn('ssh-add', [`${file}`], { shell: true })
            result.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            result.stderr.on('data', (data) => {
                console.log(data.toString())
            });

        } catch (error) {
            logger(error)
        }
    }
}

export {
    SSHService
}