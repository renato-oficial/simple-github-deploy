import fs from 'node:fs/promises'
import { logger } from '../lib/logger.js'

class SSHPasskeyManager {


    static async passkeyFile(props) {
        const { file, title, page } = props
        try {
            if (!file || !title || !page) throw new Error("Erro ao processar dados recebidos")
            const fileExists = await fs.stat(file)
            if (fileExists) {
                return fs.readFile(file, { encoding: 'utf-8' })
            }
        } catch (error) {
            logger.error(error)
        }

    }
}

export {
    SSHPasskeyManager
}