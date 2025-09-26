import { A } from '@solidjs/router'
import { For, type Component } from 'solid-js'

interface NavButton {
  title: string
  href: string
}

const NAV_BUTTONS: NavButton[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'Add new product',
    href: '/editor',
  },
]

const Sidebar: Component = () => {
  return (
    <aside class="w-64 bg-base-200">
      <h1 class="text-center text-xl text-primary py-4">Magazynator</h1>
      <nav class="px-4">
        <For each={NAV_BUTTONS}>
          {(button) => (
            <A
              href={button.href}
              end={true}
              class="block p-2 border-l-2 hover:bg-base-content/10 transition"
              inactiveClass="border-transparent"
              activeClass="border-primary bg-base-300"
            >
              {button.title}
            </A>
          )}
        </For>
      </nav>
    </aside>
  )
}

export default Sidebar
