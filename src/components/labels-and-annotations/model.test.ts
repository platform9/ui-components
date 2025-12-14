import type { AnnotationProps, BadgesProps, LabelProps, RenderLabelParams } from './model'

describe('labels-and-annotations/model', () => {
  it('exports types that can be referenced', () => {
    const badges: BadgesProps = {
      entityType: 'labels',
      containerType: 'panel',
      maxVisible: 3,
      testId: 'badges',
    }

    const labels: LabelProps = {
      ...badges,
      labels: { foo: 'bar', count: 1 },
      separator: ', ',
    }

    const annotations: AnnotationProps = {
      ...badges,
      annotations: { a: 'b' },
      separator: ';',
    }

    const render: RenderLabelParams = {
      ...badges,
      separator: ', ',
    }

    expect(labels.labels.foo).toBe('bar')
    expect(annotations.annotations.a).toBe('b')
    expect(render.separator).toBe(', ')
  })
})
