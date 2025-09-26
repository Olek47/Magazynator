import type { ParentComponent } from 'solid-js'
import Sidebar from './Sidebar'

const Layout: ParentComponent = (props) => {
  return (
    <div class="flex h-screen">
      <Sidebar />
      <main class="grow p-4">{props.children}</main>
    </div>
  )
}

export default Layout
