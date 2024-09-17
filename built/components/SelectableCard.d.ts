import { FC, PropsWithChildren } from 'react';
import { CardProps } from '../elements/card/Card';
declare const SelectableCard: FC<PropsWithChildren<SelectableCardProps>>;
interface SelectableCardProps extends CardProps {
    id: any;
    onClick: any;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    showCheckmarkIcon?: boolean;
}
export default SelectableCard;
