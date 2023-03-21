import React, { PropsWithChildren } from 'react';
import AppTheme from 'src/theme-manager/themes/model';
import * as CSS from 'csstype';
export declare const CustomThemeConsumer: React.Consumer<{
    theme: AppTheme;
    setCustomTheme: (theme: AppTheme) => void;
}>;
export declare const CustomThemeProvider: React.Provider<{
    theme: AppTheme;
    setCustomTheme: (theme: AppTheme) => void;
}>;
export declare const loadingStyles: CSS.Properties;
interface Props {
    themeActions: any;
}
export default function ThemeManager({ themeActions, children }: PropsWithChildren<Props>): JSX.Element;
export declare function useCustomTheme(): [AppTheme, (theme: AppTheme, updateUserPrefs?: boolean) => void];
export declare const withCustomTheme: (Component: any) => (props: any) => JSX.Element;
export {};
