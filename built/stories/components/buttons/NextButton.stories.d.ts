import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NextButton from '../../../components/buttons/NextButton';
type NextButtonProps = React.ComponentProps<typeof NextButton>;
declare const meta: Meta<NextButtonProps>;
export default meta;
type Story = StoryObj<NextButtonProps>;
export declare const Default: Story;
export declare const NoIcon: Story;
