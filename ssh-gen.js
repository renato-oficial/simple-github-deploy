import fs from "node:fs/promises"
import path from "node:path"
import { exec, spawn } from "node:child_process"


// Constantes
const USER = process.env.USER
const SSHPATH = path.join("/home/", USER, "/.ssh")
const EMAIL = "renatoalcantara2022@gmail.com"
const NAME = "teste"
//exec('echo "ssh-keygen" -q -t ed25519 -C "your_email@example.com" -N \'\' -f ~/.ssh/teste <<< y')
const ls = spawn('ssh-keygen', ['-q', '-t', 'ed25519', '-C', `${EMAIL}`, '-f', `/home/renato/.ssh/${NAME}`], { shell: true })

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

const addPrivateSSHAgent = async () => {
    try {

        exec('eval "$(ssh-agent -s)"', (error, stdout, stderr) => {
            if (error) {
                throw new Error(error)
            }

        })

        const shell = `${SSHPATH}/${NAME}`
        exec(`ssh-add ${shell}`, (error, stdout, stderr) => {
            if (error) {
                throw new Error(error)
            }

        })

    } catch (error) {
        console.log(error)
    }
}


ls.on('close', (code) => {
    if (code === 0) {
        addPrivateSSHAgent()
    }
});


//const dir = path.join("/home/", USER, "/.ssh", "/config")
//const file = await fs.readFile(dir, { encoding: "utf-8" })

//ssh-keygen -q -t rsa -N ''

//ssh-keygen -q -t ed25519 -C "your_email@example.com" -N '' -f ~/.ssh/teste <<y >/dev/null 2>2&1

