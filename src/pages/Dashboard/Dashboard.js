import React, {useState, useEffect, useRef} from 'react';
import {promoService} from '../../services/';

const Dashboard = (props) => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(false);
    const isInitialMount = useRef(true);

    // component did mount
    useEffect(() => {

        console.log('mount');

        // We declare a new function for our async await call
        // If the callback of the useEffect is async the cleanup function will not work (unmount)
        const getPromos = async () => {
            try {
                const response = await promoService.getAll();
                setPromos(response.data);
            } catch (error) {
                setError(true);
            }
        }
        
        getPromos();

        // component will unmount
        return () => console.log('unmounted')
        
    }, []);

    // component did update
    // !! WARNING !! Do not update any state in this method (it will make a infinite loop)
    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            console.log('updated')
    })



    const removePromo = (id) => {
        const promosUpdated = promos.filter((promo) => promo.id !== id);
        setPromos(promosUpdated);
    }

    const listing_promo = promos.map((promo, i) => {
        return (
            <div key={i} onClick={(e) => removePromo(promo.id)}>
                <h6>{promo.name}</h6>
            </div>
        )
    });

    return (
        <>
            {error && <p>Erreur server</p>}
            <h1>Welcome !</h1>
            {listing_promo}
        </>
    )
}

export default Dashboard;