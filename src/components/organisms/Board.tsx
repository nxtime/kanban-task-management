import { useState } from "react";
import { IColumn, IBoard, ITask } from "../../interfaces/boards";
import { IBoardStore, useBoardStore } from "../../stores/boardStore";
import Modal from "../templates/Modal";

const colors = ["#49C4E5", "#8471F2", "#67E2AE"];

const Board = () => {
  const {
    board: boards,
    selectedBoard,
    setCurrentSelectedTask
  } = useBoardStore((state) => state);
  const board = boards[selectedBoard];

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  return (
    <>
      {!board ? (
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <h2 className="text-heading-md font-bold text-gray">
            This board is empty. Create a new column to get started.
          </h2>
          <button className="btn btn-primary capitalize">
            + add new column
          </button>
        </div>
      ) : (
        <ul className="flex p-6 gap-6">
          {board.columns.map((column, colIndex: number) => (
            <li key={column.name} className="w-[280px]">
              <div className="flex gap-2 items-center">
                <span
                  className={`h-4 w-4 rounded-full bg-[${colors[colIndex]}]`}
                  style={{ backgroundColor: colors[colIndex] }}
                />
                <h2 className="text-heading-sm uppercase tracking-[0.25em] text-gray font-bold">
                  {column.name} ({column.tasks.length})
                </h2>
              </div>
              <ul className="mt-4 flex flex-col gap-5">
                {column.tasks.map((task, taskIndex) => (
                  <li key={task.title}>
                    <button
                      type="button"
                      className="flex flex-col gap-4 px-4 py-6 w-full shadow-lg rounded-lg bg-white hover:bg-lines-light hover:dark:bg-lines-dark focus:dark:bg-lines-dark dark:bg-dark-gray transition-transform active:scale-95"
                      onClick={() => {
                        setSelectedTask(task);
                        setCurrentSelectedTask(colIndex, taskIndex);
                      }}
                    >
                      <h2 className="font-bold text-heading-md text-start">
                        {task.title}
                      </h2>
                      <span className="text-gray font-bold text-body-md">
                        {
                          task.subtasks.filter(({ isCompleted }) => isCompleted)
                            .length
                        }{" "}
                        of {task.subtasks.length} subtasks
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex items-center justify-center w-[280px] h-full capitalize text-gray font-bold text-body-xl bg-gradient-to-b from-dark-gray/25 to-dark-gray/10 rounded-md hover:from-dark-gray/50 hover:to-dark-gray/25 active:scale-95 transition-transform mt-8"
            >
              + new column
            </button>
          </li>
        </ul>
      )}
      <Modal task={selectedTask} closeTask={setSelectedTask} />
    </>
  );
};

export default Board;
