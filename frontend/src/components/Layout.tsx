import { type ParentComponent } from 'solid-js'
import Sidebar from './Sidebar'
import Dock from './Dock'

const Layout: ParentComponent = (props) => {
  return (
    <>
      <Sidebar />
      <Dock />
      <div class="p-4 sm:ml-64 max-sm:mb-16">
        <main class="container mx-auto">{props.children}</main>
      </div>
    </>
  )
}

export default Layout
