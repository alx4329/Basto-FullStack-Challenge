import React from 'react';
import Button from '@mui/material/Button';
import { getCows } from '../actions/actions';
import CowsList from '../components/cowsList'
import AddCow from '../components/addCow'
import SearchBar from '../components/searchBar'
import './Home.css'
const Home = () => {
    const [cows, setCows] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    
        const changeSearch = async (e) => {
            e.preventDefault();
            
            let filteredCows = cows.filter(
                (cow) =>
                cow.id_senasa.toLowerCase().includes(e.target.value.toLowerCase()) ||
                cow.paddockName.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setCows(filteredCows);
            setSearch(e.target.value);
        };
    
    React.useEffect(() => {
        setIsLoading(true)
        loadCows()
    },[])
    const loadCows = () => {
        getCows()
            .then(res => {
                setCows(res.data);
                setIsLoading(false);
                console.log(cows)
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
        
    })
    }
    const handleReset = () => {
        loadCows()
        setSearch("")
    }
    return (
        
        <div class="home-container">
            
            <h4>Admin/Animals</h4>
            <h1>Lista de animales</h1>
            <SearchBar search={search} setSearch={changeSearch} />
            <Button onClick={handleReset} >Reset</Button>
            {
                !isLoading && <CowsList search={search} setSearch={setSearch} list={cows} />
            }
            <AddCow />
        </div>
    )
}

export default Home;