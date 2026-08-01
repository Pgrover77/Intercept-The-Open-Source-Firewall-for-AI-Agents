import { chromium } from "playwright";
import { Recorder } from "./Recorder";

async function main() {
  // Launch a real browser (set headless: false so you can watch it happen)
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Create a recorder for this session
  const recorder = new Recorder(page, "login-flow-demo");

  // Hand-scripted "task": navigate to a public login demo page and log in
  await recorder.navigation("https://the-internet.herokuapp.com/login");
  await recorder.type("#username", "tomsmith");
  await recorder.type("#password", "SuperSecretPassword!");
  await recorder.click("button[type='submit']");

  // Save the recorded session to sessions/login-flow-demo-<timestamp>/session.json
  recorder.save("login-flow-demo", "manual-playwright");

  await browser.close();
}

main().catch((err) => {
  console.error("Test recorder failed:", err);
  process.exit(1);
});