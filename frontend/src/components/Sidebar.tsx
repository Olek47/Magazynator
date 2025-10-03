import { A } from '@solidjs/router'
import { For, type Component } from 'solid-js'
import { NAV_BUTTONS } from '../nav'
import Icon from './Icon'

const Sidebar: Component = () => {
  return (
    <aside class="max-sm:hidden fixed top-0 left-0 z-10 w-64 h-full bg-base-200">
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
              <div class="flex items-center gap-2">
                <Icon path={button.icon} class="size-[1.2em]" />
                {button.title}
              </div>
            </A>
          )}
        </For>
      </nav>
    </aside>
  )
}

export default Sidebar
