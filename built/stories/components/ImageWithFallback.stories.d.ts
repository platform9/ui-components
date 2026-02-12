import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ImageWithFallback from '../../components/image-fallback';
type ImageWithFallbackProps = React.ComponentProps<typeof ImageWithFallback>;
declare const meta: Meta<ImageWithFallbackProps>;
export default meta;
type Story = StoryObj<ImageWithFallbackProps>;
export declare const Default: Story;
export declare const FallbackTriggered: Story;
