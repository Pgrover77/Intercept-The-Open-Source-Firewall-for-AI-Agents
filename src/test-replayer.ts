import { replaySessions } from "./replayer"

const baseLineDir = "sessions/login-flow-demo-1785582266319"
const newRunDir = "sessions/demoLogin-1785588205635"
const diffRunDir = "diffs/test-run1"

const report  = replaySessions(baseLineDir,newRunDir,diffRunDir)

console.log(JSON.stringify(report, null, 2))        // we want it as whole and dont wanna transform and keep it pretty with 2 space indentation