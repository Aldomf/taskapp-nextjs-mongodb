import Link from "next/link";

function TaskCard({ task }) {
  const createdAt = new Date(task.createdAt).toLocaleDateString();

  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="bg-gray-700 p-8 text-white rounded-md hover:cursor-pointer hover:bg-gray-500">
        <h3 className="font-bold text-2xl mb-2 text-[#009FBC]">{task.title}</h3>
        <p className="text-white mb-2">{task.description}</p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold">Created at:</span> {createdAt}
          </p>
      </div>
    </Link>
  );
}

export default TaskCard;
