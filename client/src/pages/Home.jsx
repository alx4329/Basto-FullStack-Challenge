import React from 'react';
import Button from '@mui/material/Button';
import { getCows } from '../actions/actions';
import CowsList from '../components/cowsList'
import AddCow from '../components/addCow'
import SearchBar from '../components/searchBar'
import './Home.css'
import Typography from '@mui/material/Typography';
const Home = () => {
    const [cows, setCows] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
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
            
            <Typography variant="h6" component="h2">Admin/Animals</Typography>
            
            <Typography variant="h4" component="h2">
            Lista de animales
            </Typography>;
            <div class="search-container">
                <Button size="small"  onClick={handleReset} >Refresh</Button>
                <SearchBar search={search} setSearch={changeSearch} />
            </div>
            <AddCow />
            {
                !isLoading && <CowsList search={search} setSearch={setSearch} list={cows} />
            }
        </div>
    )
}

export default Home;