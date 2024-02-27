import fs from 'node:fs/promises'
import { logger } from '../lib/logger.js'
import path from "node:path"


class SSHPasskeyManager {


    static async passkeyFile(props) {
        const { file, title, page } = props

        if (!file || !title || !page) throw new Error("Erro ao processar dados recebidos")
        const extname = path.extname(file)
        if (!extname) throw new Error('Public key error, missing ".pub" extension name.')

        const fileExists = await fs.stat(file)
        if (fileExists) {
            return fs.readFile(file, { encoding: 'utf-8' })
        }

    }
}

export {
    SSHPasskeyManager
}