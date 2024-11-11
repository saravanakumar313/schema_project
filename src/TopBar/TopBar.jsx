import React from 'react';
import  styles from './TopBar.module.css';

function TopBar({ title, onBack }) {


    return (
        <div className={styles.topBarContainer}>
            <span className={styles.backIcon} onClick={onBack}>&#8592;</span>
            <span className={styles.title}>{title}</span>
        </div>
    );
}

export default TopBar;
