import { PropsWithFormContext } from '../../components/validatedForm/withFormContext';
import { ToggleSwitchProps } from '../../elements/ToggleSwitch';
interface BaseToggleSwitchFieldProps extends Omit<ToggleSwitchProps, 'active'> {
    id: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    onChange?: (value?: boolean) => void;
}
export declare type ToggleSwitchFieldProps = PropsWithFormContext<boolean, BaseToggleSwitchFieldProps>;
declare const _default: any;
export default _default;
