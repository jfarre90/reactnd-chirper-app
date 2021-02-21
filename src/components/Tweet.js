import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { RiReplyLine } from 'react-icons/ri';
import {handleToggleTweet} from '../actions/tweets'
import {Link, withRouter} from 'react-router-dom';

export const Tweet = withRouter(({ id, history }) => {
    const dispatch = useDispatch();
    const authedUser = useSelector(state => state.authedUser);
    const formattedTweet = useSelector(state => {
        const { users, tweets } = state;

        const tweet = tweets[id];
        const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

        return tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null;
    });

    const handleLike = e => {
        e.preventDefault();

        dispatch(handleToggleTweet({
            id,
            hasLiked: formattedTweet.hasLiked,
            authedUser
        }))
    }

    const handleParentOnClickEvent = (e, id) => {
        e.preventDefault();

        history.push(`/tweet/${id}`);
    }

    const {
        name,
        avatar,
        timestamp,
        text,
        hasLiked,
        likes,
        replies,
        parent
    } = formattedTweet;

    return formattedTweet === null
        ? (<p>This tweet does not exist</p>)
        : (
            <Link to={`/tweet/${id}`} className="tweet">
                <img
                    src={avatar}
                    alt={`Avatar pf ${name}`}
                    className="avatar"
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to"
                                onClick={(e) => handleParentOnClickEvent(e, parent.id)}
                            >
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>

                    <div className="tweet-icons">
                        <RiReplyLine className="tweet-icon" />
                        <span>{replies !== 0 && replies}</span>
                        <button className="heart-button"
                            onClick={handleLike}
                        >
                            {hasLiked === true
                                ? <AiFillHeart color="#e0245e" className="tweet-icon" />
                                : <AiOutlineHeart className="tweet-icon" />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        );
})

export default Tweet;