import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NoContentMessage from '../../components/NoContentMessage';
type NoContentMessageProps = React.ComponentProps<typeof NoContentMessage>;
declare const meta: Meta<NoContentMessageProps>;
export default meta;
type Story = StoryObj<NoContentMessageProps>;
export declare const Default: Story;
export declare const CustomContent: Story;
