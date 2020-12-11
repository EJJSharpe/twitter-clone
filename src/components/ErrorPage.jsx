import React from 'react';
import styles from '../css/ErrorPage.module.css'

const ErrorPage = () => {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.heading}>404 Page Not Found</h1>
            <p className={styles.paragraph}>Whoopsie! what are you looking for here? Do that again and ill tell your mum.</p>
        </div>
    );
};

export default ErrorPage;