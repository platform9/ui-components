import { FC, PropsWithChildren } from 'react';
declare const NumberedSteps: FC<PropsWithChildren<NumberedStepProps>>;
interface NumberedStepProps {
    step: number;
    title?: string;
    description: string | JSX.Element;
}
export default NumberedSteps;
