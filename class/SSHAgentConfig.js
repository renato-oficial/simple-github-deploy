import path from "node:path"
import { logger } from "../lib/logger.js";
import { exec, spawn } from "node:child_process"

const USER = process.env.USER
const SSHPATH = path.join("/home/", USER, "/.ssh")

class SSHAgentConfig {
    #email;
    #name;
    #path;
    constructor(email, name, path = "") {
        this.#email = email
        this.#name = name
        this.#path = path
    }

    passkeyGenerate() {
        try {
            spawn('ssh-keygen', ['-q', '-t', 'ed25519', '-C', `${this.#email}`, '-f', `/home/renato/.ssh/${this.#name}`], { shell: true })
        } catch (e) {
            logger.error(e)
        }
    }
}

export {
    SSHAgentConfig
}