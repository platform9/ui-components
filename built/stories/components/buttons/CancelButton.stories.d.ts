import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CancelButton from '../../../components/buttons/CancelButton';
type CancelButtonProps = React.ComponentProps<typeof CancelButton>;
declare const meta: Meta<CancelButtonProps>;
export default meta;
type Story = StoryObj<CancelButtonProps>;
export declare const Default: Story;
export declare const CustomLabel: Story;
