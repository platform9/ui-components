import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PassiveHeaderLink from '../../components/passive-header-link';
type PassiveHeaderLinkProps = React.ComponentProps<typeof PassiveHeaderLink>;
declare const meta: Meta<PassiveHeaderLinkProps>;
export default meta;
type Story = StoryObj<PassiveHeaderLinkProps>;
export declare const Default: Story;
export declare const WithClickHandler: Story;
