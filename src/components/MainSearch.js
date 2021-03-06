import React, { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';

import { baseUrl } from "../config";


const Mainsearch = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState("");

    const usersArray = [];
    const users = props.users.search;
    users.forEach(user => {
        usersArray.push(user.username)
    })

    const handleSearchInput = event => {
        const value = event.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, "i");
            suggestions = usersArray.sort().filter(val => regex.test(val));
        }
        setSuggestions(suggestions)
        setText(value);
    }

    const suggestionSelected = value => {
        setText(value);
        setSuggestions([]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`${baseUrl}/api/user/search/${text}`);
        const searchUserData = await res.json();
        const searchUserId = searchUserData.userId;
        props.history.push(`/profile/${searchUserId}`);
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) return null;
        return (
            <ul className="search__suggestion-wrapper">
                {suggestions.map((item) => <li key={item} onClick={() => suggestionSelected(item)} className="search__suggestion">{item}</li>)}
            </ul>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="search__form">
            <SearchIcon className="search__icon" style={{ fontSize: 28 }} />
            <div className="searchbar__container">
                <input onChange={handleSearchInput} type="search" value={text} className="search__input" placeholder="Try harrisonford, tomcruise..." />
                {renderSuggestions()}
            </div>
        </form>
    );

}


export default Mainsearch;
