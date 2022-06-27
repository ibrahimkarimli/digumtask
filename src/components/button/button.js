import style from './button.module.css';

const Button = (props) => {
    const { name, value, id, className, visible, onClick } = props;
    const { button } = style;
    return (<>
        {!visible && <button name={name} id={id} value={value} className={`${className} ${button}`} onClick={onClick}>{name}</button>}
    </>)
}

export default Button;