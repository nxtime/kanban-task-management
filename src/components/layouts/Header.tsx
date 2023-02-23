import { useBoardStore } from "../../stores/boardStore";


const Header = () => {
  const { board: boards, selectedBoard } = useBoardStore((state) => state);

  const { name } = boards[selectedBoard];
  return (
    <header
      className="bg-white dark:bg-dark-gray h-24 border border-transparent border-b-lines-light dark:border-b-lines-dark flex items-center justify-between px-6"
    >
      <h2 className="text-heading-xl font-bold">{name}</h2>
      <div className="flex gap-4 items-center">
        <button type="button" className="btn btn-primary capitalize" >+ add new task</button>
        <button type="button" className="btn btn-sm btn-ghost" >Button</button>
      </div>
    </header>
  )
}

export default Header
