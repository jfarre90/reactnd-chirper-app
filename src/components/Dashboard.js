import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tweet from './Tweet';

export const Dashboard = (props) => {
    const tweetIds = useSelector(state => {
        const { tweets } = state;

        return Object.keys(tweets)
            .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp);
    });

    return (
        <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list">
                {tweetIds.map((tweetId)=> (
                    <li key={tweetId}>
                        <Tweet id={tweetId}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;