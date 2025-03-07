import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const fetchCountries = async () => {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    const countries = res.data.map((country: any) => country.name?.common);

    countries.sort((a: string, b: string) => a.localeCompare(b));
    return countries;
}

export const useCountries = () => {
    const { data, isLoading, error } = useQuery(
        { queryKey: ['countries'], 
            queryFn: fetchCountries 
        });

    return {
        countries: data,
        loading: isLoading,
        error: error
    };
}