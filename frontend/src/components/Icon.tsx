import type { Component } from 'solid-js'

const Icon: Component<{
  path: string
  fill?: string
  class?: string
}> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={props.fill ?? 'currentColor'}
      class={props.class ?? 'size-[1em]'}
    >
      <path d={props.path} />
    </svg>
  )
}

export default Icon
