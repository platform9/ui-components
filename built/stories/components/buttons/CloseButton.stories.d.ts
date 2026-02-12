import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CloseButton from '../../../components/buttons/CloseButton';
type CloseButtonProps = React.ComponentProps<typeof CloseButton>;
declare const meta: Meta<CloseButtonProps>;
export default meta;
type Story = StoryObj<CloseButtonProps>;
export declare const Default: Story;
export declare const WithLink: Story;
