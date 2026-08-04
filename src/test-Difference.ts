import { compareScreenshots } from "./difference";

const imagePathA = "/Users/pratyushgrover/Documents/agent-replay/sessions/login-flow-demo-1785582266319/4-after.png";
const imagePathB = "/Users/pratyushgrover/Documents/agent-replay/sessions/demoLogin-1785588205635/3-after.png"

const result = compareScreenshots(
    imagePathA,
    imagePathB,
    "difference-output.png"
)

console.log("Diff result:", result)