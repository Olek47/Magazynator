import type { ParentComponent } from 'solid-js'
import type { JSX } from 'solid-js/h/jsx-runtime'
import { Portal, Show } from 'solid-js/web'

const Modal: ParentComponent<{
  isOpen: boolean
  onClose: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  title: string
}> = (props) => {
  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class="fixed inset-0 bg-black/25 flex items-center justify-center z-10">
          <div class="bg-slate-800 rounded-lg p-4 w-full max-w-lg m-4">
            <div class="flex justify-between items-center border-b border-gray-400 pb-3 mb-4">
              <h2 class="text-xl font-semibold text-gray-400">{props.title}</h2>
              <button
                onClick={props.onClose}
                class="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div>{props.children}</div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}

export default Modal
