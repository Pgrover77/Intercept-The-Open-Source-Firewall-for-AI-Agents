import path from "path";
import fs from "fs"


export default function HomePage(){

  const sessionsDir = path.join(process.cwd(), "..", "sessions")
  const folders:string[] = fs.readdirSync(sessionsDir);

  return(
    <div>
      <h1>Recorded runs</h1>
      <ul>
        {folders.map((folder) => (
          <li key={folder}>{folder}</li>
        ))}
      </ul>
    </div>
  )
}