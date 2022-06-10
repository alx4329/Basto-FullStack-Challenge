import React from 'react';
import Button from '@mui/material/Button';
import { getCows } from '../actions/actions';
import CowsList from '../components/cowsList'
const Home = () => {
    const [cows, setCows] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true)
        getCows()
            .then(res => {
                setCows(res.data);
                setIsLoading(false);
                console.log(cows)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    },[])
    return (
        
        <div>
            <h4>Admin/Animals</h4>
            <h1>Cows List</h1>
            <Button variant="contained">Add cow</Button>
            {
                !isLoading && <CowsList list={cows} />}
        </div>
    )
}

export default Home;