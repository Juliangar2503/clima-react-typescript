import axios from "axios"
import { SearchType, Weather } from "../types"
import { z } from "zod"
import { useMemo, useState } from "react"
// import { number, object, string, Output, parse } from "valibot"

// zod
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type WeatherInfered = z.infer<typeof WeatherSchema>


const initialState: Weather = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)

    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const apiKey = import.meta.env.VITE_API_KEY

    // TYPE GUARDS O ASSERTION
    // function isWeather(weather: unknown) {
    //     return (
    //         Boolean(weather) && 
    //         typeof weather === 'object' &&
    //         typeof (weather as Weather).name === 'string' &&
    //         typeof (weather as Weather).main === 'object' &&
    //         typeof (weather as Weather).main.temp === 'number' &&
    //         typeof (weather as Weather).main.temp_max === 'number' &&
    //         typeof (weather as Weather).main.temp_min === 'number'
    //     )
    // }


    // Valibot
    // const WeatherSchema = object({
    //     name: string(),
    //     main: object({
    //         temp: number(),
    //         temp_max: number(),
    //         temp_min: number()
    //     })
    // })

    // type WeatherInfered = Output<typeof WeatherSchema>



    const fetchWeather = async (search: SearchType) => {
        setWeather(initialState)
        setLoading(true)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&limit=1&appid=${apiKey}&appid=${apiKey}`
            const { data } = await axios(geoUrl)
            if(data.length === 0){
                console.log('No hay datos para la ciudad')
                setWeather(initialState)
                setNotFound(true)
                return
            }
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}`

            // CASTEAR EL TYPE
            // const {data: weatherResult} = await axios<Weather>(weatherUrl) 
            // console.log(weatherResult.main.temp)

            // TYPE GUARDS
            // const {data: weatherResult} = await axios(weatherUrl) 
            // const result = isWeather(weatherResult)
            // console.log(result)

            // zod
            const { data: weatherResult } = await axios.get<WeatherInfered>(weatherUrl)
            const result = WeatherSchema.safeParse(weatherResult)
            console.log(result)
            if (result.success) {
                setWeather(result.data)
            } else {
                console.log(result.error)
            }

            // valibot
            // const {data: weatherResult} = await axios.get<WeatherInfered>(weatherUrl)
            // const result = parse(WeatherSchema, weatherResult)
            // console.log(result)


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather?.name, [weather])

    return {
        weather,
        fetchWeather,
        notFound,
        loading,
        hasWeatherData
    }
}
