import Sample from './Sample'
import Component from './Component'

export const tabs = {
  draw: {
    name: 'draw',
    icon: 'fa-pen-swirl',
    elements: [<Component></Component>],
  },
  sample: {
    name: 'sample',
    icon: 'fa-table-layout',
    elements: [<Sample></Sample>],
  },
}
