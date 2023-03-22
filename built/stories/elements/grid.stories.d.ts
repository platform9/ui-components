/// <reference types="react" />
import { Meta } from '@storybook/react';
import { Movie } from '../data/movies-list';
import { GridProps } from '../../elements/grid/Grid';
declare type GlobalFilters = {
    search: string;
};
declare type Filters = {
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
declare const GridStories: Meta;
export default GridStories;
