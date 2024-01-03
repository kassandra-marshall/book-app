import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function MyCollection () {
    const [mycollection, setMyCollection] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:9000/books').then(res => {
            setMyCollection(res.data) 
    
        }).catch(err => console.log(err));


    }, [])

    return (
        <div>
            {mycollection.map(item => {
                return (
                    <div key={item.ID}>
                        <li>{item.Title}</li>
                        <Link to={`/booklist/${item.ID}`}>View Book</Link>
                        <button onClick={(e) => {
                            axios.delete('http://localhost:9000/books', { data: { ID: item.ID } })
                                .then(res => {
                                    window.location.reload(false)
                                })
                                .catch(err => console.error(err))

                        }}>Remove From Collection</button>
                    </div>
                )
            })}
        </div>
    )
    
};
export default MyCollection;