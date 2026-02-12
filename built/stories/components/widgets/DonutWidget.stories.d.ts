import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DonutWidget from '../../../components/widgets/DonutWidget';
type DonutWidgetProps = React.ComponentProps<typeof DonutWidget>;
declare const meta: Meta<DonutWidgetProps>;
export default meta;
type Story = StoryObj<DonutWidgetProps>;
export declare const Default: Story;
export declare const Empty: Story;
