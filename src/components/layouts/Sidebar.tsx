import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { useBoardStore } from '../../stores/boardStore'
import { useUserSettingsStore } from '../../stores/userSettingsStore'
import '../../styles/sidebar.sass'


const Sidebar = () => {
  const { board: boards, selectedBoard, setSelectedBoard } = useBoardStore((state) => state)
  const { darkMode, toggleDarkMode, sidebardCollapsed, setSidebardCollapsed } = useUserSettingsStore((state) => state)

  // const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' ?? true)
  // const [hideSidebar, setHideSidebar] = useState(false)

  const html = document.querySelector('html');

  const toggleDarkModeFn = (mode?: boolean) => {
    toggleDarkMode(mode ?? !darkMode)
    //setDarkMode((prevMode) => mode ?? !prevMode)
    if (html && darkMode !== mode) html.classList.toggle('dark')
    // localStorage.setItem('darkMode', (mode ?? !darkMode).toString())
  }

  useEffectOnce(() => {
    if (html === null) return
    html.classList.add(darkMode ? 'dark' : 'light')
  })

  return (
    <AnimatePresence initial={false}>
      {
        !sidebardCollapsed ? (
          <motion.aside
            key="sidebar"
            initial={{
              // width: 0,
              // x: -300,
              marginLeft: -300,
              paddingRight: 0
            }}
            animate={{
              // width: 300,
              // x: 0,
              marginLeft: 0,

              paddingRight: 64
            }}
            exit={{
              // width: 0,
              // x: -300,
              marginLeft: -300,
              paddingRight: 0
            }}
            transition={{
              type: 'linear',
              ease: 'easeInOut',
              duration: 0.3
            }}
            className="bg-white dark:bg-dark-gray w-[300px] h-full border border-transparent border-r-lines-light dark:border-r-lines-dark pr-8 pt-8 flex flex-col gap-8"
          >
            <div className="flex gap-2 pl-8">
              <img src="/icons/logo-symbol.svg" alt="logo" className="h-8 w-8" />
              <img src="/icons/logo-name.svg" alt="logo" className="h-8 w-24" />
            </div>
            <ul className="relative text-gray w-full board-container">
              <li className="pl-8">
                <span className="flex items-center uppercase h-12 text-heading-sm font-bold tracking-widest">all boards ({boards.length})</span>
              </li>
              {boards.map((board, boardIndex) => (
                <li key={boardIndex} className="w-full">
                  <button
                    type="button"
                    className={`board-item 
                  ${selectedBoard === boardIndex ? ' active' : ''}
              `}
                    onClick={() => {
                      setSelectedBoard(boardIndex)
                    }}
                  >
                    <img src="/icons/board.svg" alt="board" className="h-4 w-4 fill-gray" />
                    <span className="text-heading-md font-bold">{board.name}</span>
                  </button>
                </li>
              ))}
              <li className="w-full">
                <button
                  type="button"
                  className={`board-item-new`}
                  onClick={() => {
                  }}
                >
                  <img src="/icons/board.svg" alt="board" className="h-4 w-4 fill-gray" />
                  <span className="text-heading-md font-bold capitalize">+ create new board</span>
                </button>
              </li>

            </ul>

            <div className="mt-auto mb-8 flex flex-col gap-4">
              <div className="mt-auto mx-auto flex gap-4 rounded-md ml-8 p-2 mr-0 bg-light-gray dark:bg-black-highlight justify-center items-center">
                <button type="button" className="" onClick={() => toggleDarkModeFn(false)}>
                  <img src="/icons/lightmode-icon.svg" alt="logo" className="h-5 w-5" />
                </button>
                <input
                  type="checkbox"
                  id="darkmode"
                  className="checkbox"
                  checked={darkMode}
                  onChange={() => {
                    const html = document.querySelector('html')
                    toggleDarkModeFn()
                  }}
                />
                <button type="button" className="" onClick={() => toggleDarkModeFn(true)}>
                  <img src="/icons/darkmode-icon.svg" alt="logo" className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="flex gap-2 items-center capitalize ml-8 text-gray text-heading-md font-bold"
                onClick={() => setSidebardCollapsed(true)}
              >
                <img src="/icons/eye-hidden.svg" alt="logo" className="h-4 w-4" />
                <span>hide sidebar</span>
              </button>
            </div>
          </motion.aside>
        ) : (
          <motion.button
            key="sidebar-hidden"
            initial={{
              x: -48,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -48,
            }}
            transition={{
              type: 'linear',
              duration: 0.2
            }}
            type="button"
            className="absolute bottom-8 left-0 h-12 w-12 bg-accent rounded-r-full flex justify-center items-center"
            onClick={() => setSidebardCollapsed(false)}
          >
            <img src="/icons/eye-show.svg" alt="logo" className="h-4 w-4" />
          </motion.button>
        )}
    </AnimatePresence>
  )
}

export default Sidebar
