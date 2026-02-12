import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../../components/SearchBar';
type SearchBarProps = React.ComponentProps<typeof SearchBar>;
declare const meta: Meta<SearchBarProps>;
export default meta;
type Story = StoryObj<SearchBarProps>;
export declare const Default: Story;
export declare const PreFilled: Story;
