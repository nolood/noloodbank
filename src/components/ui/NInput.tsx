import {FC} from "react";
import './UiStyles.scss'
interface NInputProps {
    type: string,
    placeholder?: string,
    value: string,
    setValue: (value: string) => void,
    readonly?: boolean
}

const NInput: FC<NInputProps> = ({type, placeholder, value, setValue, readonly}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            className='NInput'
            readOnly={readonly ? readonly : false}
        />
    );
};

export default NInput;