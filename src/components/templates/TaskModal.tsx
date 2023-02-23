import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { ITask } from "../../interfaces/boards";
import ListSelect from "../molecules/Select";
import "../../styles/modal.sass";

const Modal = ({ task, closeTask }: { task: ITask | null; closeTask: any }) => {
  if (task === null) return null;

  return (
    <AlertDialog.Root open={task !== null}>
      <AlertDialog.Trigger asChild>
        <button className="Button violet">Delete account</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <div className="modal">
          <AlertDialog.Overlay className="modal-overlay" />
          <AlertDialog.Content className="modal-content">
            <AlertDialog.Title className="modal-content__title">
              {task.title}
            </AlertDialog.Title>
            <AlertDialog.Description className="modal-content__description">
              {task.description === "" ? (
                <span className="text-gray">No description</span>
              ) : (
                <span>{task.description}</span>
              )}
            </AlertDialog.Description>
            <Task task={task} />
            <div
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
            >
              <AlertDialog.Cancel asChild>
                <button
                  className="Button mauve"
                  onClick={() => closeTask(null)}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="Button red">Yes, delete account</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

const Task = ({ task }: { task: ITask }) => {
  const completedIndexes = task.subtasks.reduce(
    (acc, { isCompleted }, i) => (isCompleted ? [...acc, i] : acc),
    [] as number[]
  ) as unknown as number[];
  const [selectedOption, setSelectedOption] = useState(task.status);
  const [isCompleted, setIsCompleted] = useState(completedIndexes);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-heading-md text-start">
        Subtasks ({isCompleted.length} of {task.subtasks.length})
      </h2>
      <ul className="flex flex-col gap-2">
        {task.subtasks.map((subtask, subtaskIndex) => {
          return (
            <li key={`subtask-${subtaskIndex}`}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`subtask-${subtaskIndex}`}
                  checked={isCompleted.includes(subtaskIndex)}
                  onChange={() => {
                    if (isCompleted.includes(subtaskIndex)) {
                      setIsCompleted((prevCompleted) =>
                        prevCompleted.filter((index) => index !== subtaskIndex)
                      );
                    } else {
                      setIsCompleted((prevCompleted) => [
                        ...prevCompleted,
                        subtaskIndex
                      ]);
                    }
                  }}
                />
                <label
                  htmlFor={`subtask-${subtaskIndex}`}
                  className="checkbox-label"
                >
                  <span className="checkbox-label__text">{subtask.title}</span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="">
        <ListSelect
          title="Current status"
          options={["TODO", "IN PROGRESS", "DONE"]}
          selectedOption={selectedOption}
          setSelectedOption={(option) => setSelectedOption(option)}
        />
      </div>
    </div>
  );
};

export default Modal;
