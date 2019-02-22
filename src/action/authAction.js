import { LOGIN } from './types';

export const login = () => dispatch => {
    console.log("action dispatch")
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => dispatch({
            type: FETCH_POSTS,
            payload: posts
        }))

}
