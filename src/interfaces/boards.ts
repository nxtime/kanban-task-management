interface IBoard {
  name: string,
  columns: IColumn[]
}

interface IColumn {
  name: string,
  tasks: ITask[]
}

interface ITask {
  title: string,
  description: string,
  status: "Todo" | "In Progress" | "Done" | "Blocked",
  subtasks: ISubtask[]
}

interface ISubtask {
  title: string,
  isCompleted: boolean
}


export type { IBoard, IColumn, ITask, ISubtask }
