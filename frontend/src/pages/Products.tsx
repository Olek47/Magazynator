import { createResource, createSignal, For, type Component } from 'solid-js'
import { deleteProduct, getProducts } from '../api'
import ProductCard from '../components/ProductCard'
import { useNavigate } from '@solidjs/router'

const Products: Component = () => {
  const [search, setSearch] = createSignal<string>('')
  const [minStock, setMinStock] = createSignal<number>(NaN)
  const [maxStock, setMaxStock] = createSignal<number>(NaN)

  const [products, { refetch }] = createResource(
    () => {
      return {
        search: search(),
        minStock: minStock(),
        maxStock: maxStock(),
      }
    },
    async (data) => getProducts(data.search, data.minStock, data.maxStock),
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
      <div class="join w-full mb-4">
        <label class="input grow join-item">
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
        <input
          type="number"
          class="input join-item w-32"
          placeholder="Min stock"
          min="0"
          onInput={(e) => setMinStock(parseInt(e.target.value, 10))}
        />
        <input
          type="number"
          class="input join-item w-32"
          placeholder="Max stock"
          min="0"
          onInput={(e) => setMaxStock(parseInt(e.target.value, 10))}
        />
      </div>

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
