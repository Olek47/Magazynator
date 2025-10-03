import { For, type Component } from 'solid-js'
import { NAV_BUTTONS } from '../nav'
import { A } from '@solidjs/router'
import Icon from './Icon'

const Dock: Component = () => {
  return (
    <div class="dock sm:hidden">
      <For each={NAV_BUTTONS}>
        {(button) => (
          <A href={button.href} end={true} activeClass="dock-active">
            <Icon path={button.icon} class="size-[1.2em]" />
            <span class="dock-label">{button.title}</span>
          </A>
        )}
      </For>
    </div>
  )
}

export default Dock
