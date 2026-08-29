import * as fs from "fs";
import * as path from "path";
import { session, step } from "./types";
import { compareScreenshots, DifferenceResult } from "./difference";


// this is basically us comparing the same step between two images
export interface stepComparison {
 stepNumber: number;
 action: string;
 passed: boolean;
 diffResult: DifferenceResult;
}


// this other object we are creating is for the overall report comparison between two sessions
export interface ReplayReport {
 baselineTask: string;
 newTask: string;
 totalSteps: number;
 passedSteps: number;
 failedSteps: number;
 stepComparisons: stepComparison[];
}


// loads a session.json file from disk and parses it into a usable object
function loadSession(sessionDir: string): session {
 const filePath = path.join(sessionDir, "session.json");
 const raw = fs.readFileSync(filePath, "utf-8");
 return JSON.parse(raw) as session;
}


export function replaySessions(
 baselineSessionDir: string,
 newSessionDir: string,
 diffOutputDir: string
): ReplayReport {
 const baseline = loadSession(baselineSessionDir);
 const newRun = loadSession(newSessionDir);


 fs.mkdirSync(diffOutputDir, { recursive: true });


 const stepComparisons: stepComparison[] = [];
 const stepCount = Math.min(baseline.steps.length, newRun.steps.length);


 for (let i = 0; i < stepCount; i++) {
   const baselineStep = baseline.steps[i];
   const newStep = newRun.steps[i];


   const diffOutputPath = path.join(diffOutputDir, `step-${baselineStep.stepNumber}-diff.png`);


   const diffResult = compareScreenshots(
     baselineStep.screenShotAfter,
     newStep.screenShotAfter,
     diffOutputPath
   );


   const passed = diffResult.diffPercentage < 2;


   stepComparisons.push({
     stepNumber: baselineStep.stepNumber,
     action: baselineStep.action,
     passed,
     diffResult,
   });
 }


 const passedSteps = stepComparisons.filter((s) => s.passed).length;
 const failedSteps = stepComparisons.length - passedSteps;


 return {
   baselineTask: baseline.taskName,
   newTask: newRun.taskName,
   totalSteps: stepComparisons.length,
   passedSteps,
   failedSteps,
   stepComparisons,
 };
}
