import fs from "node:fs/promises"
import path from "node:path"
import { exec, spawn } from "node:child_process"

const USER = process.env.USER
const SSHPATH = path.join("/home/", USER, "/.ssh")
const NAME = "WAFlowConnection"
const addPrivateSSHAgent = async () => {
    try {

        exec('eval "$(ssh-agent -s)"', (error, stdout, stderr) => {
            if (error) {
                throw new Error(error)
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        })


        const shell = `${SSHPATH}/${NAME}`
        exec(`ssh-add ${shell}`, (error, stdout, stderr) => {
            if (error) {
                throw new Error(error)
            }
            console.error(`stderr: ${stderr}`);
        })


    } catch (error) {
        console.log(error)
    }
}

addPrivateSSHAgent()