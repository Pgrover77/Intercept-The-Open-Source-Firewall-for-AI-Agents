export interface step {
    stepNumber: number,
    action:string,          // this is the just the example of button clicks
    target:string,          // this is the example of selector,url
    screenShotBefore: string,
    screenShotAfter: string,
    timeStamp: string,
    reasoning?:string,      // be filled in later  explaining the behavior of the agent

}

export interface session{
    taskName:string,
    agentUsed: string, //claude-code or someother for ex
    date:string
    steps: step[];
}