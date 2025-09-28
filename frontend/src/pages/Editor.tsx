import { useParams } from '@solidjs/router'
import { createResource, Show, type Component } from 'solid-js'
import ProductEditor from '../components/ProductEditor'
import { getProduct } from '../api'

const Editor: Component = () => {
  const params = useParams()

  if (!params.id) {
    return (
      <ProductEditor onSuccess={() => alert('Product created successfully!')} />
    )
  }

  const [product] = createResource(async () => getProduct(params.id))

  return (
    <Show when={product()}>
      <ProductEditor
        editingProduct={product()}
        onSuccess={() => alert('Product updated successfully!')}
      />
    </Show>
  )
}

export default Editor
