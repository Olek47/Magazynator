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
        <div class="card-title text-primary">
          <h2 class="grow">{props.product.name}</h2>
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
        <p class="whitespace-pre-line">
          {props.product.description || 'No description'}
        </p>
        <div class="card-actions">
          <pre class="grow self-end">
            {props.product.ean} {props.product.location}
          </pre>
          <button class="btn btn-primary" onClick={props.onEdit}>
            Edit
          </button>
          <button class="btn btn-error" onClick={props.onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
