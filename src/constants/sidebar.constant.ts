import productIcon from '@/assets/icons/icon-product.svg'
import categoryIcon from '@/assets/icons/icon-category.svg'
import type { SideBarLinkType } from '@/types/SideBarLinkType'

export const SIDEBAR_LINKS = [
  {
    title: 'Categoria',
    route: {
      name: 'category.index'
    },
    icon: {
      src: categoryIcon
    }
  },
  {
    title: 'Produto',
    route: {
      name: 'product.index'
    },
    icon: {
      src: productIcon
    }
  }
] satisfies SideBarLinkType[]
