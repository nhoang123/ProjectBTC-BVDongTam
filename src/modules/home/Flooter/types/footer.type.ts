export interface NavItem {
  label: string
  href: string
}

export interface NavColumnData {
  title: string
  links: NavItem[]
}

export interface ContactInfoData {
  hotline: string
  address: string
  email: string
  workingHours: string
  mapDirectionsUrl: string
}