import puppeteer, { EventEmitter } from "puppeteer";
import { logger } from "./lib/logger.js";


let cookie = null;


const next_launch = async (title, pass_key, page) => {
    const browser_second = await puppeteer.launch({
        headless: true,
        devtools: false,
        args: [
            "--devtools-flags=disable",
            "--window-size=500,500",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
            "--incognito",
        ],
        defaultViewport: {
            width: 500,
            height: 500
        }
    })

    const page_second = (await browser_second.pages())[0];
    if (page_second) {
        await page_second.setCookie(...cookie)
    }

    console.log("page", page)
    await page_second.goto(`${page}/settings/keys/new`, {
        waitUntil: "networkidle0",
    });

    await page_second.waitForSelector('input[id="public_key_title"]', { visible: true })
    await page_second.type('input[id="public_key_title"]', title, { delay: 100 })
    await page_second.type('#public_key_key', pass_key, { delay: 100 })
    const checkbox = await page_second.$('#public_key_read_only')
    await checkbox.click({ delay: 100 })
    await page_second.click('button[name="key_submit"]')
    setTimeout(async () => {
        await browser_second.close()
        logger.info("[-] Github passkey deploy add successfully!")
    }, 5000)
}


const launcher_browser = async (title, pass_key, page) => {
    const browser_first = await puppeteer.launch({
        headless: false,
        devtools: false,
        args: [
            "--devtools-flags=disable",
            "--window-size=500,800",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--unhandled-rejections=strict",
            "--incognito",
        ],
        defaultViewport: {
            width: 500,
            height: 800
        }
    })

    const page_first = (await browser_first.pages())[0];
    page_first.setDefaultNavigationTimeout(0);
    await page_first.goto('https://github.com/login', {
        waitUntil: "networkidle0",
    });

    let isLogged = false

    browser_first.on("disconnected", () => {
        console.log("Broser closed!")
        if (isLogged) {
            next_launch(title, pass_key, page)
        }
    })

    try {
        isLogged = await page_first.waitForFunction(() => {
            console.log('wait')
            const dashboard = document.querySelector('body > div.logged-in.env-production.page-responsive.full-width > div.position-relative.js-header-wrapper > header > div > div.AppHeader-globalBar-start > div > div.AppHeader-context-full > nav > ul > li > a > span')
            if (dashboard) {
                return true
            }
            return false
        }, { timeout: 80000 })

        cookie = await page_first.cookies()
    } catch (error) {
        logger.error(error)
    }
}


export {
    launcher_browser
}


