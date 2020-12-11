import React from 'react';
import styles from '../css/Postbar.module.css';

const PostBar = (props) => {
    return (
        <div className='PostBar'>
            <form className={styles.formContainer}>
                <input className={styles.textInput} type='text' placeholder='whats on your mind?'></input>
            </form>
        </div>
    );
};

export default PostBar;