import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LevelBox from '../LevelBox.vue'

describe('LevelBox', () => {
  it('renders properly', () => {
    const wrapper = mount(LevelBox, { props: { title: 'Level 1', desc: '8 sec for each stage' } })
    expect(wrapper.text()).toContain('Level 1')
    expect(wrapper.text()).toContain('8 sec for each stage')
  })
})
