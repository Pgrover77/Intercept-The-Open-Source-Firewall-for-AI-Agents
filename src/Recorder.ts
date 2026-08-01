import path from "path";
import type { session, step } from "./types";
import {Page} from "playwright"
import * as fs from "fs"
import { after } from "node:test";

export class Recorder {
    private steps: step[] = [];
    private page: Page
    private sessionDir: string;
    private stepCounter = 0;
    
    constructor(page:Page, taskName:string){
        this.page = page;
        const timeStamp = Date.now()
        this.sessionDir = path.join("sessions", `${taskName}-${timeStamp}`)
        fs.mkdirSync(this.sessionDir, {recursive:true}) // creates the folder on the go 

    }

    private async screenshot(label:string): Promise<string>{
        const filePath = path.join(this.sessionDir, `${this.stepCounter}-${label}.png`)
        await this.page.screenshot({path:filePath})
        return filePath
    }

    async click(selector:string): Promise<void>{
        this.stepCounter++;
        const before = await this.screenshot("before")
        await this.page.click(selector)
        const after = await this.screenshot("after")
        this.steps.push({
            stepNumber: this.stepCounter,
            action: "click",
            target: selector,
            screenShotBefore: before,
            screenShotAfter: after,
            timeStamp: new Date().toISOString(),
        })
    }

    async type(selector:string,text:string): Promise<void>{
        this.stepCounter++;
        const before = await this.screenshot("before")
        await this.page.fill(selector,text)
        const after = await this.screenshot("after")

        this.steps.push({
            stepNumber: this.stepCounter,
            action:"type",
            target:`${selector} <- ${text}`,
            screenShotBefore: before,
            screenShotAfter: after,
            timeStamp: new Date().toISOString(),       
        })
    }

    async navigation(url:string):Promise<void>{
        this.stepCounter++;
        const before = await this.screenshot("before")
        await this.page.goto(url);
        const after = await this.screenshot("after")

        this.steps.push({
            stepNumber: this.stepCounter,
            action: "navigate",
            target: url,
            screenShotBefore:before,
            screenShotAfter:after,
            timeStamp: new Date().toISOString()
        })
    }


    save(taskName:string, agentUsed:string): void {
        const session: session = {
            taskName,
            agentUsed,
            date: new Date().toISOString(),
            steps:  this.steps
        }
        const filePath = path.join(this.sessionDir, "session.JSON")
        fs.writeFileSync(filePath,JSON.stringify(session, null, 2))     // no custom-replacer function (so that there is no tranformation and everything is strictly as it is in the json data)  and kept it indented to make it easy to read
        console.log(`session saved to ${filePath}`)

    }


}




