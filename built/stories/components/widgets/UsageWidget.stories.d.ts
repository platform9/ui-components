import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UsageWidget from '../../../components/widgets/UsageWidget';
type UsageWidgetProps = React.ComponentProps<typeof UsageWidget>;
declare const meta: Meta<UsageWidgetProps>;
export default meta;
type Story = StoryObj<UsageWidgetProps>;
export declare const Default: Story;
export declare const HighUsage: Story;
