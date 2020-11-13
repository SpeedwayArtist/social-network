import React, {useState} from 'react';
import css from './Paginator.module.css';
import cn from 'classnames';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={cn(css.paginator)}>
        {portionNumber > 1 &&
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Preview</button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <=rightPortionPageNumber)
            .map(num => {
            return (
                <span onClick={(e) => {
                    onPageChanged(num)
                }}
                      className={cn(css.page, {[css.pageActive]: currentPage === num})}
                      key={num}>{num}</span>
            );
        })}
        {portionCount > portionNumber &&
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>
}

export default Paginator;