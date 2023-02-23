import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar'

const Layout = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    <div className="h-screen">
      <main className="h-full flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="bg-light-gray dark:bg-black-highlight flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>

    </div>
  )
}

export default Layout;
