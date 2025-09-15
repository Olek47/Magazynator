import { createSignal, type Component } from 'solid-js'
import {
  createProduct,
  updateProduct,
  uploadImage,
  type CreateProduct,
  type Product,
} from '../api'

const ProductEditor: Component<{
  onSuccess: () => void
  editingProduct: Product | null
}> = (props) => {
  const [ean, setEan] = createSignal(props.editingProduct?.ean ?? '')
  const [name, setName] = createSignal(props.editingProduct?.name ?? '')
  const [quantity, setQuantity] = createSignal(
    props.editingProduct?.quantity ?? 0
  )
  const [location, setLocation] = createSignal(
    props.editingProduct?.location ?? ''
  )
  const [description, setDescription] = createSignal(
    props.editingProduct?.description ?? ''
  )
  const [imageFile, setImageFile] = createSignal<File | null>(null)

  const [isSubmitting, setIsSubmitting] = createSignal(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data: CreateProduct = {
      ean: ean().padStart(14, '0'),
      name: name(),
      quantity: quantity(),
      location: location(),
      description: description(),
    }

    try {
      const res = await (props.editingProduct
        ? updateProduct(props.editingProduct!.id, data)
        : createProduct(data))

      if (imageFile()) {
        await uploadImage(res.id, imageFile()!)
      }
      props.onSuccess()
    } catch (e) {
      alert(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ean"
        maxlength="14"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        placeholder="EAN"
        required
        onInput={(e) => setEan(e.target.value)}
        value={ean()}
      />

      <input
        type="text"
        name="name"
        maxlength="256"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        placeholder="Product Title"
        required
        onInput={(e) => setName(e.target.value)}
        value={name()}
      />

      <input
        type="number"
        name="quantity"
        min="0"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        placeholder="Quantity"
        required
        onInput={(e) => setQuantity(parseInt(e.target.value, 10))}
        value={quantity()}
      />

      <input
        type="text"
        name="location"
        maxlength="256"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        placeholder="Location (optional)"
        onInput={(e) => setLocation(e.target.value)}
        value={location()}
      />

      <textarea
        name="description"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        placeholder="Product Description (optional)"
        onInput={(e) => setDescription(e.target.value)}
        value={description()}
      ></textarea>

      <input
        type="file"
        accept="image/*"
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
      />

      <input
        type="submit"
        value={isSubmitting() ? 'Saving...' : 'Save'}
        class="block p-1 my-2 w-full text-sm border-2 border-violet-500 rounded outline-none cursor-pointer transition hover:bg-slate-700 disabled:bg-slate-700"
        disabled={isSubmitting()}
      />
    </form>
  )
}

export default ProductEditor
