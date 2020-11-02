import React, { useState } from 'react';
import { useQuery } from 'react-query' // useQuery Hook to manage our asynchronous data.
import Person from './Person';

const fetchPeople = async (key, page) => {
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json(); //use the json() method to access the data after fetching.
}

const People = () => {
    const [page, setPage ] = useState(1);
    const { data, status } = useQuery(['people', page], fetchPeople);
    console.log(data);
    return (
        <div>
            <h2>People</h2>

            <button onClick={ () => setPage(1) }>1</button>
            <button onClick={ () => setPage(2) }>2</button>
            <button onClick={ () => setPage(3) }>3</button>
            <button onClick={ () => setPage(4) }>4</button>
            <button onClick={ () => setPage(5) }>5</button>
            <button onClick={ () => setPage(6) }>6</button>
            <button onClick={ () => setPage(7) }>7</button>
            <button onClick={ () => setPage(8) }>8</button>
            <button onClick={ () => setPage(9) }>9</button>

            { status === 'loading' && ( <div className="loading">Loading data...</div> )}
            { status === 'error' && ( <div className="error">Error fetching data</div> )}
            { status === 'success' && (
                <div>
                    { data.results.map(person => <Person key={ person.name } person={ person }/>) }
                </div>
            )}
        </div>
    );
}

// React Query
// - const { data, status } = useQuery('planets', fetchPlanets); - First Argument: Query name / Second Argument: Function
// - The useQuery() Hook uses the async function to pull data. The data and the status of the data can be accessed via destructuring
// - The useQuery() Hook gives us two values; the data(object) & the status of the data(success/loading/error)

// Adavantage 
// After the initial rendering, React Query will be using cached data for better user experience.
// But, in the background React Query & useQuery is refetching the data just to see if there is any update.
// If there is an update, It'll show the updated data instead, so it's always going to stay in sync.
// But we're using the cached data for better user experience until we perform that check, now when it performs ~
// that check, there is no need to update that data if it's the same. But if there was a change, it would update it for us.
// ~ It's a really nice user experience

export default People;