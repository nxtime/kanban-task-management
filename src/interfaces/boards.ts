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
  status: any,
  subtasks: ISubtask[]
}

interface ISubtask {
  title: string,
  isCompleted: boolean
}


export type { IBoard, IColumn, ITask, ISubtask }
