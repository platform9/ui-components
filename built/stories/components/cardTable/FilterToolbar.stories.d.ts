import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterToolbar from '../../../components/cardTable/FilterToolbar';
type FilterToolbarProps = React.ComponentProps<typeof FilterToolbar>;
declare const meta: Meta<FilterToolbarProps>;
export default meta;
type Story = StoryObj<FilterToolbarProps>;
export declare const Default: Story;
export declare const WithSorting: Story;
