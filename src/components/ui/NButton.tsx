import {FC, SyntheticEvent} from "react";

interface NButtonProps {
    func: (e: SyntheticEvent) => void,
    title: string,
    variant?: string
}

const NButton: FC<NButtonProps> = ({func, title, variant}) => {
    return (
        <button
            className={variant === 'green' ? 'NButton green' : variant === 'purple' ? 'NButton purple' : 'NButton'}
            onClick={e => func(e)}
        >
            {title}
        </button>
    );
};

export default NButton;