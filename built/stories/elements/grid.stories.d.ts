/// <reference types="react" />
import { Meta } from '@storybook/react';
import { Movie } from '../data/movies-list';
import { GridProps } from '../../elements/grid/Grid';
type GlobalFilters = {
    search: string;
};
type Filters = {
    year: string;
    genre: string;
};
export declare const UncontrolledGrid: {
    (args: Partial<GridProps<Movie, GlobalFilters, Filters>>): JSX.Element;
    parameters: {
        docs: {
            source: {
                code: string;
            };
        };
    };
    args: {
        size: string;
    };
};
export declare const AsyncGrid: (args: Partial<GridProps<Movie, GlobalFilters, Filters>>) => JSX.Element;
export declare const ExpandableRowGrid: (args: Partial<GridProps<Movie, GlobalFilters, Filters>>) => JSX.Element;
declare const GridStories: Meta;
export default GridStories;
