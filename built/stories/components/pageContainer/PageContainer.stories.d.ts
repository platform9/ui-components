import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PageContainer from '../../../components/pageContainer/PageContainer';
type PageContainerProps = React.ComponentProps<typeof PageContainer>;
declare const meta: Meta<PageContainerProps>;
export default meta;
type Story = StoryObj<PageContainerProps>;
export declare const Default: Story;
export declare const WithoutFloatingHeader: Story;
