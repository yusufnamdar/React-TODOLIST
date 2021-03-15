import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTask] = useState([]);
  //useeffect her update execute edilirmi?
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTask(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch tasks from server. created outside of useeffect due to other possible uses
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //Add Task to data within usestate
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTask([...tasks, data]);
  };

  //Deleting Task in data of usestate
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTask(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder in data of usestate
  async function toggleReminder(id) {
    //neden fetchtask?
    const taskToToggle = await fetchTask(id);
    //...taskToToggle a gerek var mı?
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  }

  return (
    <div className="container">
      <Header
        name="yusuf"
        visibility={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      >
        Yusuf
      </Header>
      {/* shorter version of terniary-- without else statement */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {/* nested javascript expressions ? */}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "There is no task"
      )}
    </div>
  );
}
//changes
export default App;
