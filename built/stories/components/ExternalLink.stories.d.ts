import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ExternalLink from '../../components/ExternalLink';
type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>;
declare const meta: Meta<ExternalLinkProps>;
export default meta;
type Story = StoryObj<ExternalLinkProps>;
export declare const Default: Story;
export declare const CustomContent: Story;
