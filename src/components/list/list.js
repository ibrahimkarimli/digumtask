import style from './list.module.css';

const List = (props) => {
    const { data, onClick, visible } = props;
    const { list } = style
    return (visible && <ul className={list}>{data && data.map((item) => {
        const { Id, Title } = item;
        return <li key={Id}><a href='#' onClick={() => onClick(Id, Title)}>{Title}</a></li>
    })}</ul>)
}

export default List;