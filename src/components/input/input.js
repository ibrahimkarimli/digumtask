import React from 'react';
import style from './input.module.css';

const Input = (props) => {
    const { placeholder, name, type, className = '', visible, id, onChange, value, disabled, isChecked } = props;
    const { input } = style;
    return (<>{visible ?? <input checked={isChecked} disabled={disabled} onChange={onChange} defaultValue={value} type={type ? type : "text"} id={id} placeholder={placeholder} name={name} className={`${className ? className : input}`} />}</>)
}

export default Input;