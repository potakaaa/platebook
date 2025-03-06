import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const fetchCountries = async () => {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    console.log(res.data?.common?.name)
    return res.data?.common?.name;
}

export const useCountries = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['countries'], queryFn: fetchCountries });

    return {
        countries: data,
        loading: isLoading,
        error: error
    };
}