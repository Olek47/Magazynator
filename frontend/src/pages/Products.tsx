import { createResource, createSignal, For, type Component } from 'solid-js'
import { deleteProduct, getProducts } from '../api'
import ProductCard from '../components/ProductCard'
import { useNavigate } from '@solidjs/router'

const Products: Component = () => {
  const [search, setSearch] = createSignal<string>('')
  const [products, { refetch }] = createResource(search, async (s) =>
    getProducts(s),
  )

  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    if (confirm('Do you really want to delete this product?')) {
      deleteProduct(id)
        .then(() => refetch())
        .catch((e) => alert(e))
    }
  }

  return (
    <>
      <label class="input w-full mb-4">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          placeholder="Search by product name or EAN"
          onInput={(e) => setSearch(e.target.value)}
        />
      </label>

      <div class="space-y-4">
        <For each={products()}>
          {(product) => (
            <ProductCard
              product={product}
              onEdit={() => navigate(`/editor/${product.id}`)}
              onDelete={() => handleDelete(product.id)}
            />
          )}
        </For>
      </div>
    </>
  )
}

export default Products
