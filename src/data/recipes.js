export const RECIPES = {
  iron_ore: {
    id: 'iron_ore',
    output: 'iron_ore',
    outputAmount: 1,
    inputs: {},
  },
  iron_ingot: {
    id: 'iron_ingot',
    output: 'iron_ingot',
    outputAmount: 1,
    inputs: {
      iron_ore: 2,
    },
  },
}
