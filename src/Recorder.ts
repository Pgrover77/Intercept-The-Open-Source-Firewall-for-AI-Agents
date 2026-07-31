import path from "path";
import type { step } from "./types";
import {Page} from "playwright"
import * as fs from "fs"

export class Recorder {
    private steps: step[] = [];
    private page: Page
    private sessionDir: string;
    private stepCounter: 0    
    
    constructor(page:Page, taskName:string){
        this.page = page;
        const timeStamp = Date.now()
        this.sessionDir = path.join("sessions", `${taskName}-${timeStamp}`)
        fs.mkdirSync(this.sessionDir, {recursive:true})
    }


}   



