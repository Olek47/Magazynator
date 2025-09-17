import { For, Show, type Component } from 'solid-js'
import { deleteProduct, type Product } from '../api'

const IMAGE_URL = 'http://localhost:3000/uploads/'

const ProductCard: Component<{
  product: Product
  refresh: () => void
  edit: (product: Product) => void
}> = (props) => {
  const handleDelete = () => {
    if (confirm('Do you really want to delete this product?')) {
      deleteProduct(props.product.id)
        .then(() => props.refresh())
        .catch((e) => alert(e))
    }
  }

  const handleEdit = () => {
    props.edit(props.product)
  }

  return (
    <div class="p-2 my-2 min-h-32 grid grid-cols-[12rem_1fr_min-content] grid-rows-[min-content_1fr_min-content] gap-x-4 rounded hover:bg-slate-800">
      <Show
        when={props.product.imageFile}
        fallback={<div class="row-span-3"></div>}
      >
        <img
          src={`${IMAGE_URL}${props.product.imageFile}`}
          class="row-span-3"
        />
      </Show>

      <div class="flex">
        <h2 class="text-xl text-violet-500 grow">{props.product.name}</h2>
        <div
          class="font-mono text-xl text-right"
          classList={{
            'text-red-600': props.product.quantity === 0,
            'text-yellow-600':
              props.product.quantity > 0 && props.product.quantity < 3,
            'text-green-600': props.product.quantity > 2,
          }}
        >
          {props.product.quantity}
        </div>
      </div>

      <div class="row-span-3 flex flex-col-reverse gap-2 pl-2 border-l-1 border-gray-400">
        <button
          class="p-1 bg-red-800 cursor-pointer rounded transition hover:bg-red-900"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          class="p-1 bg-yellow-600 cursor-pointer rounded transition hover:bg-yellow-700"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>

      <p class="text-slate-100/75 whitespace-pre-line">
        {props.product.description ?? 'No description'}
      </p>

      <div class="flex">
        <p class="text-sm font-mono grow">{props.product.ean}</p>
        <p class="text-right">{props.product.location}</p>
      </div>
    </div>
  )
}

const ProductList: Component<{
  products: Product[]
  refresh: () => void
  edit: (product: Product) => void
}> = (props) => {
  return (
    <For each={props.products}>
      {(p) => (
        <ProductCard product={p} refresh={props.refresh} edit={props.edit} />
      )}
    </For>
  )
}

export default ProductList
