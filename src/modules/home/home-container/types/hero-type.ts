export interface HeroSlide {
  id: string | number
  subtitle: string
  title: string
  description: string
  backgroundImage: string
  alt: string
  backgroundPosition?: string
}

export interface UseHeroSliderReturn {
  current: number
  setCurrent: (value: number) => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  isDragging: boolean
  dragOffset: number
  isTransitioning: boolean
  containerRef: React.RefObject<HTMLDivElement>
  handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void
  handleDragMove: (e: React.MouseEvent | React.TouchEvent) => void
  handleDragEnd: () => void
  setIsHovering: (value: boolean) => void
}
