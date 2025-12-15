import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PageContainer from '../../../components/pageContainer/PageContainer'
import PageContainerHeader from '../../../components/pageContainer/PageContainerHeader'
import Text from '../../../elements/Text'
import Button from '../../../elements/button'

type PageContainerProps = React.ComponentProps<typeof PageContainer>

const meta: Meta<PageContainerProps> = {
  title: 'Components/PageContainer',
  component: PageContainer,
  argTypes: {
    header: { control: 'text' },
    floatingHeader: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<PageContainerProps>

const baseArgs: PageContainerProps = {
  header: <Text variant="h3">Page Title</Text>,
  floatingHeader: true,
  children: <div>Page Content</div>,
}

const Wrapper = (args: PageContainerProps) => {
    return (
        <div style={{ border: '1px solid #ccc', height: 400, overflow: 'hidden' }}>
            <PageContainer {...args}>
                <div style={{ padding: 20, backgroundColor: '#f5f5f5', height: '100%' }}>
                    <Text variant="body1">This is the page content area.</Text>
                    <div style={{ marginTop: 20 }}>
                        <Text variant="body2">The PageContainerHeader component can be used to portal content into the header area from within the content.</Text>
                        
                        {/* Example of dynamic header content */}
                        <PageContainerHeader>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <Button variant="secondary">Cancel</Button>
                                <Button variant="primary">Save</Button>
                            </div>
                        </PageContainerHeader>
                    </div>
                </div>
            </PageContainer>
        </div>
    )
}

export const Default: Story = {
  args: baseArgs,
  render: (args) => <Wrapper {...args} />
}

export const WithoutFloatingHeader: Story = {
  args: {
    ...baseArgs,
    floatingHeader: false,
  },
  render: (args) => <Wrapper {...args} />
}
