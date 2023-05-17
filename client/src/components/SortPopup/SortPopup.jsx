import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

const SortPopup = ({ items, handleSelectSort, selectedSort }) => {
    const sortRef = useRef();
    const [visiblePopup, setVisiblePopup] = useState(false);

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const onSelectItem = (item) => {
        handleSelectSort(item);
        setVisiblePopup(false);
    };

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className='sort-trigger'
            ref={(ref) => {
                sortRef.current = ref;
            }}>
            <i className="fas fa-sliders-h" onClick={toggleVisiblePopup}></i>
            {visiblePopup && (
                <div className="item-list__sort-by">
                    <ul>
                        {items &&
                            items.map((obj, index) => (
                                <li
                                    className={selectedSort.id === obj.id ? 'li--active' : ''}
                                    onClick={() => onSelectItem(obj)}
                                    key={`${obj.type}_${index}`}>
                                    {obj.name}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

SortPopup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeSortType: PropTypes.string.isRequired,
    onClickSortPopup: PropTypes.func.isRequired,
};

SortPopup.defaultProps = {
    items: [],
};

export default SortPopup;