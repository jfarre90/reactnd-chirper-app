import React, { useState } from 'react';
import {handleAddTweet} from '../actions/tweets';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';

export const NewTweet = ({id}) => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [toHome, setToHome] = useState(false);

    const handleTextChange = e => {
        const inputText = e.target.value;

        setText(inputText);
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(handleAddTweet(text, id))

        setText('');
        setToHome(id ? false : true)
    }

    const tweetLeft = 280 - text.length;

    return toHome
    ? (<Redirect to='/' />)
    :
     (
        <div>
            <h3 className="center">Compose your new Tweet</h3>
            <form className="new-tweet" onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's happening?"
                    onChange={handleTextChange}
                    value={text}
                    className='textarea'
                    maxLength={280} />
                {tweetLeft <= 100 && (
                    <div className="tweet-length">
                        {tweetLeft}
                    </div>
                )}
                <button
                    className="btn"
                    type="submit"
                    disabled = {text === ''}>
                        Submit
                    </button>
            </form>
        </div>
    )
}

export default NewTweet;