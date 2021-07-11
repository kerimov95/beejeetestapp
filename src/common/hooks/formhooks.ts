import { useState } from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export const useStringField = (initValue: string): [string, (event: InputChangeEvent | TextAreaChangeEvent) => void] => {

    const [value, setValue] = useState<string>(initValue);

    const handleChange = (event: InputChangeEvent) => {
        setValue(event.target.value);
    }

    return [value, handleChange];
}
