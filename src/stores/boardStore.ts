import { create, SetState, StoreApi } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBoard, IColumn, ITask } from '../interfaces/boards'
import { boards } from '../mock/boards.json'

export interface IBoardStore {
  board: IBoard[],
  selectedBoard: number,
  currentSelectedTask: number[],
  setSelectedBoard: (boardIndex: number) => void,
  setCurrentSelectedTask: (colIndex: number, taskIndex: number) => void,
  addBoard: (board: IBoard) => void,
  updateBoardName: (boardIndex: number, name: string) => void,
  deleteBoard: (boardIndex: number) => void,
  addColumn: (boardIndex: number, column: IColumn) => void,
  updateColumnName: (boardIndex: number, columnIndex: number, name: string) => void,
  deleteColumn: (boardIndex: number, columnIndex: number) => void,
  addTask: (task: ITask) => void,
  updateTask: (task: ITask) => void,
}

export const useBoardStore = create(persist<IBoardStore>(
  (set) => ({
    board: boards as unknown as IBoard[],
    selectedBoard: 0,
    currentSelectedTask: [],
    setSelectedBoard: (boardIndex) => set({ selectedBoard: boardIndex }),
    setCurrentSelectedTask: (colIndex, taskIndex) => set({ currentSelectedTask: [colIndex, taskIndex] }),
    addBoard: (board: IBoard) => set((state) => ({ board: [...state.board, board] })),
    updateBoardName: (boardIndex, name) => set((state) => {
      const newBoard = [...state.board]
      newBoard[boardIndex].name = name
      return { board: newBoard }
    }),
    deleteBoard: (boardIndex) => set((state) => {
      const newBoard = [...state.board]
      newBoard.splice(boardIndex, 1)
      return { board: newBoard }
    }),
    addColumn: (boardIndex, column) => set((state) => {
      const newBoard = [...state.board]
      newBoard[boardIndex].columns = [...newBoard[boardIndex].columns, column]
      return { board: newBoard }
    }),
    updateColumnName: (boardIndex, columnIndex, name) => set((state) => {
      const newBoard = [...state.board]
      newBoard[boardIndex].columns[columnIndex].name = name
      return { board: newBoard }
    }),
    deleteColumn: (boardIndex, columnIndex) => set((state) => {
      const newBoard = [...state.board]
      newBoard[boardIndex].columns.splice(columnIndex, 1)
      return { board: newBoard }
    }),
    addTask: (task) => set((state) => {
      const newBoard = [...state.board]
      newBoard[state.selectedBoard].columns[state.currentSelectedTask[0]].tasks = [...newBoard[state.selectedBoard].columns[state.currentSelectedTask[0]].tasks, task]
      return { board: newBoard }
    }),
    updateTask: (task) => set((state) => {
      const newBoard = [...state.board]
      newBoard[state.selectedBoard].columns[state.currentSelectedTask[0]].tasks[state.currentSelectedTask[1]] = task
      return { board: newBoard }
    }),
  }),
  {
    name: 'kanban@boards',
  }))
