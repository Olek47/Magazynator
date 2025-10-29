export interface Product {
  id: string
  code: string
  name: string
  quantity: number
  location: string
  description: string
  imageFile?: string
  createdAt: string
  updatedAt: string
}

export type CreateProduct = Omit<
  Product,
  'id' | 'imageFile' | 'createdAt' | 'updatedAt'
>

export const API_URL = import.meta.env.VITE_API_URL ?? '/api/v1'
export const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL ?? '/uploads'

export async function getProducts(
  search?: string,
  minStock?: number,
  maxStock?: number,
): Promise<Product[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)

  if (minStock !== undefined && !isNaN(minStock)) {
    params.append('minStock', minStock.toString())
  }

  if (maxStock !== undefined && !isNaN(maxStock)) {
    params.append('maxStock', maxStock.toString())
  }

  const res = await fetch(`${API_URL}/products?${params.toString()}`)
  const json = await res.json()
  if (json.message) throw new Error(json.message.toString())
  return json
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`)
  const json = await res.json()
  if (json.message) throw new Error(json.message.toString())
  return json
}

export async function createProduct(data: CreateProduct): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.message) throw new Error(json.message.toString())
  return json
}

export async function updateProduct(
  id: string,
  data: Partial<CreateProduct>,
): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.message) throw new Error(json.message.toString())
  return json
}

export async function deleteProduct(id: string): Promise<void> {
  await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
}

export async function uploadImage(
  id: string,
  file: File,
): Promise<CreateProduct> {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API_URL}/products/${id}/upload-image`, {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  if (json.message) throw new Error(json.message.toString())
  return json
}
