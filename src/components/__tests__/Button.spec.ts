import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, { props: { text: 'Ok' } })
    expect(wrapper.text()).toContain('Ok')
  })

  it('has correct size', () => {
    const btnSm = mount(Button, { props: { text: 'Ok', size: 'sm' } })
    expect(btnSm.classes()).toContain('px-2')
    expect(btnSm.classes()).toContain('py-1')
    expect(btnSm.classes()).toContain('text-xs')

    const btnMd = mount(Button, { props: { text: 'Ok', size: 'md' } })
    expect(btnMd.classes()).toContain('px-2')
    expect(btnMd.classes()).toContain('py-1')
    expect(btnMd.classes()).toContain('text-sm')

    const btnLg = mount(Button, { props: { text: 'Ok', size: 'lg' } })
    expect(btnLg.classes()).toContain('px-2')
    expect(btnLg.classes()).toContain('py-2')
    expect(btnLg.classes()).toContain('text-lg')
  })

  it('has correct color', () => {
    const btnPrimary = mount(Button, { props: { text: 'Ok', color: 'primary' } })
    expect(btnPrimary.classes()).toContain('bg-primary4')

    const btnSecondary = mount(Button, { props: { text: 'Ok', color: 'secondary' } })
    expect(btnSecondary.classes()).toContain('bg-primary3')
  })
})
