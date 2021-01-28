import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {
  const [tasks, setTask] = useState([
    //Redux stores states that we can pull for any component
    //we dont want this to be separate from our component, instead part of our state
    { text: "Doctors Appointment", day: "Feb 5th", reminder: true },
    { text: "Meeting at school", day: "Jan 8th", reminder: false },
    //state is immutable, tasks.push() cant be used.
    //instead you need to re-create and sent it down.
    //setTask([...tasks, { text: "Hiking", day: "Jan 8th", reminder: false }]);
  ]);
  return (
    <div className="container">
      <Header name="yusuf">
        <span>Yusuf</span>
      </Header>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
