import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataPointLine from '../../../components/dataPointLine/DataPointLine';
type DataPointLineProps = React.ComponentProps<typeof DataPointLine>;
declare const meta: Meta<DataPointLineProps>;
export default meta;
type Story = StoryObj<DataPointLineProps>;
export declare const Default: Story;
export declare const CustomColors: Story;
