import style from './tags.module.css';

const Tags = (props) => {
    const { data, disabled, onDel, filtering, filterFunc } = props
    const { tag, del } = style;
    return (<div>
        {data.map((item) => {
            const { Id, Title } = item;
            return (<div className={tag} key={Id}>
                {filtering ? <a href="#" onClick={() => filterFunc(Id)}>{Title}</a> : <label>{Title}</label>}
                {!disabled && <a href="#" className={del} onClick={() => onDel(Id)}>X</a>}
            </div>)
        })}
    </div>)
}

export default Tags;