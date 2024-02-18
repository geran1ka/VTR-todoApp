import classNames from "classnames";
import { useAppSelector } from "../../hooks";
import { TaskItem } from "../../TaskItem/TaskItem";

export const TaskList = () => {
  interface ITask {
    id: string;
    task: string;
    completed: boolean;
    important: string;
  }

  const tasks = useAppSelector((state) => state.tasks.tasks);
  // const [tasks, setTasks] = useState(initialTask);

  return tasks.length >= 1 ? (
    <div className={classNames("table-wrapper")}>
      <table className={classNames("table table-hover table-bordered h-100")}>
        <thead>
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return <TaskItem key={task.id} {...task} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>Вас список дел пока пустой</div>
  );
};
