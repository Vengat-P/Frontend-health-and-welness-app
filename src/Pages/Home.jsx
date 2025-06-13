import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const handleLocate = ()=>{
        navigate("/personaldetails")
    }
    return (
        <div>
            <button type="button" onClick={handleLocate} className='p-2 bg-gray-600 rounded-lg text-white'>
                My Fitness Info
            </button>
        </div>
    );
};

export default Home;