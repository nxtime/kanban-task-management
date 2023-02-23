
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useState } from 'react';
import { ITask } from '../../interfaces/boards';
import ListSelect from '../molecules/Select';
import '../../styles/modal.sass'
import { useBoardStore } from '../../stores/boardStore';

const TaskModal = ({ task, taskIndex, closeTask }: { task: ITask | null, taskIndex: number, closeTask: any }) => {

  if (task === null) return null;


  return (
    <AlertDialog.Root open={task !== null}>
      <AlertDialog.Portal >
        <div className="modal">
          <AlertDialog.Overlay className="modal-overlay" />
          <AlertDialog.Content className="modal-content">
            <AlertDialog.Title className="modal-content__title">{task.title}</AlertDialog.Title>
            <AlertDialog.Description className="modal-content__description">
              {
                task.description === '' ? (
                  <span className="text-gray">No description</span>
                ) : (
                  <span>{task.description}</span>
                )
              }
            </AlertDialog.Description>
            <Task task={task} taskIndex={taskIndex} />
            <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
              <AlertDialog.Cancel asChild >
                <button className="Button mauve" onClick={() => closeTask(null)}>Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="Button red">Yes, delete account</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

const Task = () => {
  const { updateTask, board: boards, currentSelectedTask, selectedBoard } = useBoardStore((state) => state);
  const task = boards[selectedBoard].columns[currentSelectedTask[0]].tasks[currentSelectedTask[1]];
  const isCompleted = task.subtasks.reduce(
    (acc, { isCompleted }, i) => (isCompleted ? [...acc, i] : acc), [] as number[]) as unknown as number[];
  // const [isCompleted, setIsCompleted] = useState(completedIndexes);

  const [selectedOption, setSelectedOption] = useState<any>(task.status);

  console.log(selectedOption);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-heading-md text-start">
        Subtasks ({isCompleted.length} of {task.subtasks.length})
      </h2>
      <ul className="flex flex-col gap-2">
        {
          task.subtasks.map((subtask, subtaskIndex) => {
            return (
              <li key={`subtask-${subtaskIndex}`}>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id={`subtask-${subtaskIndex}`}
                    checked={isCompleted.includes(subtaskIndex)}
                    onChange={() => {
                      updateTask({
                        ...task,
                        subtasks: task.subtasks.map((subtask, index) => {
                          if (index === subtaskIndex) {
                            return {
                              ...subtask,
                              isCompleted: !subtask.isCompleted
                            }
                          }
                          return subtask;
                        })
                      });
                      //if (isCompleted.includes(subtaskIndex)) {
                      // setIsCompleted((prevCompleted) => prevCompleted.filter((index) => index !== subtaskIndex))
                      //} else {
                      // setIsCompleted((prevCompleted) => [...prevCompleted, subtaskIndex])
                      //}
                    }}
                  />
                  <label htmlFor={`subtask-${subtaskIndex}`} className="checkbox-label">
                    <span className="checkbox-label__text">{subtask.title}</span>
                  </label>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className="flex flex-col gap-2">
        <span className="text-body-md text-gray">Current Status</span>
        <ListSelect
          title="Current Status"
          options={['Todo', 'Doing', 'Done', 'Blocked']}
          selectedOption={selectedOption}
          setSelectedOption={(option) => setSelectedOption(option)}
        />
      </div>
    </div>
  )

}

export default TaskModal;
