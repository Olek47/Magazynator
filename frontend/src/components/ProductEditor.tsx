import { createSignal, type Component } from 'solid-js'
import {
  createProduct,
  updateProduct,
  uploadImage,
  type CreateProduct,
  type Product,
} from '../api'

const ProductEditor: Component<{
  editingProduct?: Product
  onSuccess?: () => void
}> = (props) => {
  const [code, setCode] = createSignal<string>(props.editingProduct?.code ?? '')
  const [name, setName] = createSignal<string>(props.editingProduct?.name ?? '')
  const [quantity, setQuantity] = createSignal<number>(
    props.editingProduct?.quantity ?? NaN,
  )
  const [location, setLocation] = createSignal<string>(
    props.editingProduct?.location ?? '',
  )
  const [description, setDescription] = createSignal<string>(
    props.editingProduct?.description ?? '',
  )
  const [imageFile, setImageFile] = createSignal<File | null>(null)

  const [isSubmitting, setIsSubmitting] = createSignal<boolean>(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data: CreateProduct = {
      code: code(),
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

      if (props.onSuccess) {
        props.onSuccess()
      }
    } catch (e) {
      alert(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div class="max-w-lg mx-auto p-4 bg-base-200 rounded-box">
      <h2 class="text-2xl font-semibold text-center mb-4 text-primary">
        {props.editingProduct ? 'Edit product' : 'Create new product'}
      </h2>

      <form class="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          maxlength="14"
          class="input w-full"
          placeholder="Product Code"
          required
          onInput={(e) => setCode(e.target.value)}
          value={code()}
        />

        <input
          type="text"
          maxlength="256"
          class="input w-full"
          placeholder="Product Title"
          required
          onInput={(e) => setName(e.target.value)}
          value={name()}
        />

        <input
          type="number"
          min="0"
          class="input w-full"
          placeholder="Quantity"
          required
          onInput={(e) => setQuantity(parseInt(e.target.value, 10))}
          value={quantity()}
        />

        <input
          type="text"
          maxlength="256"
          class="input w-full"
          placeholder="Location (optional)"
          onInput={(e) => setLocation(e.target.value)}
          value={location()}
        />

        <textarea
          class="textarea w-full"
          placeholder="Product Description (optional)"
          onInput={(e) => setDescription(e.target.value)}
          value={description()}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          class="file-input w-full"
          onInput={(e) => setImageFile(e.target.files?.[0] ?? null)}
        />

        <button
          type="submit"
          class="btn btn-primary w-full"
          disabled={isSubmitting()}
        >
          {isSubmitting() ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default ProductEditor
