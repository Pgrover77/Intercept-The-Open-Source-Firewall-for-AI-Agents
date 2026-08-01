import { Page } from "playwright";
import { Recorder } from "./Recorder";

export async function runDemoAgent(page:Page,recorder:Recorder): Promise<void>{
    

    await recorder.navigation("https://the-internet.herokuapp.com/login")

    // now a checkpoint to check if the userName field exists

    const userNameField = await page.$("#username")     //returns the element if found
    if(userNameField){
        await recorder.type("#username", "tomsmith")
    }


    const passwordField = await page.$("#username")
    if(passwordField){
        await recorder.type("#password", "SuperSecretPassword")
    }


    const submitButton = await page.$("button [Type = 'submit']")
    if(submitButton){
        await recorder.click("button [Type = 'submit']")
    }

    console.log("Demo Agent finished its task. ")
}