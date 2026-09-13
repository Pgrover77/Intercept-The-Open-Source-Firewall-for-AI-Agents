import path from "path";
import fs from "fs"

interface sessionSummary {

  folderName:string,
  taskName:string,
  agentUsed:string,
  date:string,
  stepCount:number
}

function loadSessionSummaries():sessionSummary[] {

  const sessionsDir = path.join(process.cwd(), "..", "sessions")  // basically want to navigate and run from the current working directory
  const folderNames:string[] = fs.readdirSync(sessionsDir);


  // here with this map we are just doing three things on a wide spectrum: build path, read the file, parse it to make it a usable session object
  return folderNames.map((folderName:string) => {
    const sessionJsonPath = path.join(sessionsDir,folderName, "sessions.json")
    const raw = fs.readFileSync(sessionJsonPath, "utf-8")
    const session = JSON.parse(raw)

    return {
      folderName,
      taskName: session.taskName,
      agentUsed: session.agentUsed,
      date: session.date,
      stepCount: session.steps.length,
    };
  })
}

export default function HomePage(){
  const summaries = loadSessionSummaries();

  return(
    <div style = {{padding: "2rem" }}>
      <h1>
        Recorded runs
      </h1>
      <ul>
        {summaries.map((summary) =>(
          <li key = {summary.folderName} style = {{marginBottom: "1rem"}}>
            <strong>{summary.taskName}</strong> - {summary.stepCount} steps
            <br />
            Agent: {summary.agentUsed}
            <br />
            Date: {new Date(summary.date).toLocaleString()}
            
          </li>

        ))}
      </ul>

    </div>
  )
}

  