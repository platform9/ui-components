import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CardTableToolbar from '../../../components/cardTable/CardTableToolbar';
type CardTableToolbarProps = React.ComponentProps<typeof CardTableToolbar>;
declare const meta: Meta<CardTableToolbarProps>;
export default meta;
type Story = StoryObj<CardTableToolbarProps>;
export declare const Default: Story;
export declare const WithSorting: Story;
