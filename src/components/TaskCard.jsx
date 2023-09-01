import Link from "next/link";
import { useTasks } from "@/context/TaskContext";

function TaskCard({ task }) {
  const createdAt = new Date(task.createdAt).toLocaleDateString();
  const { deleteTaskHome } = useTasks();

  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="bg-gray-700 p-8 text-white rounded-md hover:cursor-pointer hover:bg-gray-500 sm:flex items-center">
        <div className=" w-full mb-3">
          <h3 className="font-bold text-2xl text-[#009FBC]">{task.title}</h3>
          <p className="text-white my-2">{task.description}</p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold">Created at:</span> {createdAt}
          </p>
        </div>
        <div className="w-full sm:flex sm:justify-end">
          <button
            className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700 sm:w-20 w-full"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteTaskHome(task._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}

export default TaskCard;
