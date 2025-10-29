import { createResource, createSignal, For, type Component } from 'solid-js'
import { deleteProduct, getProducts } from '../api'
import ProductCard from '../components/ProductCard'
import { useNavigate } from '@solidjs/router'
import Icon from '../components/Icon'

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
          <Icon
            path="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
            class="size-[1em] opacity-50"
          />
          <input
            type="search"
            placeholder="Search by product name or code"
            onInput={(e) => setSearch(e.target.value)}
          />
        </label>
        <input
          type="number"
          class="input join-item max-w-32"
          placeholder="Min stock"
          min="0"
          onInput={(e) => setMinStock(parseInt(e.target.value, 10))}
        />
        <input
          type="number"
          class="input join-item max-w-32"
          placeholder="Max stock"
          min="0"
          onInput={(e) => setMaxStock(parseInt(e.target.value, 10))}
        />
      </div>

      <div class="grid sm:max-lg:grid-cols-2 gap-4">
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
