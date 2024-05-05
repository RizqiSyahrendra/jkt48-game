import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Loader from '../Loader.vue'

describe('Loader', () => {
  it('has correct size', () => {
    const loaderSm = mount(Loader, { props: { size: 'sm' } })
    expect(loaderSm.classes()).toContain('w-10')
    expect(loaderSm.classes()).toContain('h-10')

    const loaderMd = mount(Loader, { props: { size: 'md' } })
    expect(loaderMd.classes()).toContain('w-16')
    expect(loaderMd.classes()).toContain('h-16')

    const loaderLg = mount(Loader, { props: { size: 'lg' } })
    expect(loaderLg.classes()).toContain('w-20')
    expect(loaderLg.classes()).toContain('h-20')

    const loaderXl = mount(Loader, { props: { size: 'xl' } })
    expect(loaderXl.classes()).toContain('w-28')
    expect(loaderXl.classes()).toContain('h-28')
  })

  it('has correct color', () => {
    const loaderPrimary = mount(Loader, { props: { color: 'primary' } })
    expect(loaderPrimary.classes()).toContain('stroke-primary4')

    const loaderSecondary = mount(Loader, { props: { color: 'secondary' } })
    expect(loaderSecondary.classes()).toContain('stroke-primary1')
  })
})
