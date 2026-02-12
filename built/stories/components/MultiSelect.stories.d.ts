import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect from '../../components/MultiSelect';
type MultiSelectProps = React.ComponentProps<typeof MultiSelect>;
declare const meta: Meta<MultiSelectProps>;
export default meta;
type Story = StoryObj<MultiSelectProps>;
export declare const Default: Story;
export declare const PreSelected: Story;
