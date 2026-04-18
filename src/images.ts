export interface GalleryImage {
  id: number
  src: string
  alt: string
}

const modules = import.meta.glob('./assets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const images: GalleryImage[] = Object.values(modules).map((src, i) => ({
  id: i + 1,
  src: src as string,
  alt: `${i + 1}`,
}))
