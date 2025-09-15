import { createResource, createSignal, type Component } from 'solid-js'
import ProductList from './ProductList'
import { getProducts, type Product } from '../api'
import Modal from './Modal'
import ProductEditor from './ProductEditor'

const App: Component = () => {
  const [search, setSearch] = createSignal('')
  const [minStock, setMinStock] = createSignal(0)

  const [products, { refetch }] = createResource(
    () => {
      return {
        search: search(),
        minStock: minStock(),
      }
    },
    async (data) => getProducts(data.search, data.minStock)
  )

  const [isOpen, setIsOpen] = createSignal(false)
  const [editingProduct, setEditingProduct] = createSignal<Product | null>(null)

  return (
    <div class="container mx-auto p-2">
      <h1 class="py-4 text-center text-2xl tracking-wide">Magazynator</h1>

      <div class="my-2 flex gap-2">
        <input
          type="search"
          placeholder="Enter product name or EAN"
          class="grow p-1 border-2 border-violet-500 rounded outline-none"
          onInput={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          class="w-32 p-1 border-2 border-violet-500 rounded outline-none"
          onInput={(e) => setMinStock(parseInt(e.target.value, 10))}
          min="0"
          value="0"
        />

        <button
          onClick={() => {
            setEditingProduct(null)
            setIsOpen(true)
          }}
          class="p-1 border-2 border-violet-500 rounded cursor-pointer transition hover:bg-slate-700"
        >
          Add new
        </button>
      </div>

      <ProductList
        products={products() ?? []}
        refresh={refetch}
        edit={(product: Product) => {
          setEditingProduct(product)
          setIsOpen(true)
        }}
      />

      <Modal
        isOpen={isOpen()}
        title="Product editor"
        onClose={() => setIsOpen(false)}
      >
        <ProductEditor
          onSuccess={() => {
            refetch()
            setIsOpen(false)
          }}
          editingProduct={editingProduct()}
        />
      </Modal>
    </div>
  )
}

export default App
