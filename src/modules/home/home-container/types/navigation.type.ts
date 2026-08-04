export type SubNavigationItem = {
  label: string
  href: string
}

export type NavigationCategory = {
  label: string
  href: string
  subItems?: SubNavigationItem[]
}

export type NavigationItem = {
  label: string
  href: string
  children?: NavigationCategory[]
}