import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PrevButton from '../../../components/buttons/PrevButton';
type PrevButtonProps = React.ComponentProps<typeof PrevButton>;
declare const meta: Meta<PrevButtonProps>;
export default meta;
type Story = StoryObj<PrevButtonProps>;
export declare const Default: Story;
export declare const Disabled: Story;
