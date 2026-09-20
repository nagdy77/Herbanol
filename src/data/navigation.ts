export const navigation = [
  { id: 'about', key: 'about' },
  { id: 'product', key: 'products' },
  { id: 'applications', key: 'applications' },
  { id: 'technology', key: 'technology' },
] as const

export const pageSections = [
  { path: '/about', section: 'about' },
  { path: '/products', section: 'product' },
  { path: '/applications', section: 'applications' },
  { path: '/technology', section: 'technology' },
  { path: '/sustainability', section: 'sustainability' },
  { path: '/achievements', section: 'media' },
  { path: '/contact', section: 'contact' },
  { path: '/location', section: 'location' },
] as const
