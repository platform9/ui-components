import React from 'react';
import { RenderOptions } from '@testing-library/react';
declare const customRender: (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export * from '@testing-library/react';
export { customRender as render };
