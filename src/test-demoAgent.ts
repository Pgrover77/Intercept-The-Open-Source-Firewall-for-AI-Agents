import { chromium } from "playwright";
import { Recorder } from "./Recorder";
import { runDemoAgent } from "./demoAgent";

async function main(){
    const browser = await chromium.launch({headless: false})        // become true when it pops up 
    const page  = await browser.newPage()


    const recorder = new Recorder(page, "demoLogin")


    await runDemoAgent(page,recorder)

    recorder.save("demo-agent-Login", "demo-agent-v1")

    await browser.close()
}


main().catch((err) =>{
    console.error("Mock agent test failed:", err)
    process.exit(1)
})