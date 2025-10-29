import { Show, type Component } from 'solid-js'
import { UPLOADS_URL, type Product } from '../api'

const ProductCard: Component<{
  product: Product
  onEdit: () => void
  onDelete: () => void
}> = (props) => {
  return (
    <div class="card lg:card-side bg-base-200 shadow-sm">
      <Show when={props.product.imageFile}>
        <figure class="lg:w-48">
          <img src={`${UPLOADS_URL}/${props.product.imageFile}`} alt="" />
        </figure>
      </Show>
      <div class="card-body">
        <div class="card-title justify-between">
          <h2 class="text-primary">{props.product.name}</h2>
          <pre
            classList={{
              'text-error': props.product.quantity === 0,
              'text-warning':
                props.product.quantity > 0 && props.product.quantity < 3,
              'text-success': props.product.quantity > 2,
            }}
          >
            {props.product.quantity}
          </pre>
        </div>
        <p class="whitespace-pre-line min-h-12">
          {props.product.description || 'No description'}
        </p>
        <div class="lg:flex justify-between">
          <div class="self-end">
            <span>{props.product.location}</span>
            <pre>{props.product.code}</pre>
          </div>
          <div class="flex gap-1">
            <button class="btn btn-warning" onClick={props.onEdit}>
              Edit
            </button>
            <button class="btn btn-error" onClick={props.onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
