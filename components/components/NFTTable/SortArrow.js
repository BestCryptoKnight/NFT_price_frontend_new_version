const SortArrow = ({ sort: sort, column: column }) => {

    const arrowClick = (direction) => {
        if(direction == "asc") sort(column, 1);
        else sort(column, -1);
    }

    return (
        <div className="sortarrow">
            <div className="descending" onClick={() => {arrowClick("des")}}><i className="fa-solid fa-caret-up"></i></div>
            <div className="ascending" onClick={() => {arrowClick("asc")}}><i className="fa-solid fa-caret-down"></i></div>
        </div>
    );
}

export default SortArrow;