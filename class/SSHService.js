import { spawn } from "node:child_process"
import { logger } from "../lib/logger.js"

class SSHService {

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


    sshAdd = () => {
        try {
            const result = spawn('ssh-add', ['/home/renato/.ssh/repo-teste'], { shell: true })
            result.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            result.stderr.on('data', (data) => {
                throw new Error(data)
            });


        } catch (error) {
            logger(error)
        }
    }
}

export {
    SSHService
}