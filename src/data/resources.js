import ironOreIcon from '@/assets/icons/iron_ore.png'
import coalIcon from '@/assets/icons/coal.png'
import ironIngotIcon from '@/assets/icons/iron_ingot.png'

export const RESOURCES = {
  iron_ore: {
    id: 'iron_ore',
    label: 'Железная руда',
    icon: ironOreIcon,
    maxStorage: 999,
  },
  coal: {
    id: 'coal',
    label: 'Каменный уголь',
    icon: coalIcon,
    maxStorage: 999,
  },
  iron_ingot: {
    id: 'iron_ingot',
    label: 'Железный слиток',
    icon: ironIngotIcon,
    maxStorage: 999,
  },
}

export const RESOURCE_LIST = Object.values(RESOURCES)
