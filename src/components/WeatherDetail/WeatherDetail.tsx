
import { formatTemp } from "../../helpers"
import { WeatherInfered } from "../../hooks/useWeather"
import styles from "./WeatherDetail.module.css"

export default function WeatherDetail({weather}: {weather: WeatherInfered}) {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>Temperatura: {formatTemp(weather.main.temp)}°C</p>
        <div >
            <p>Max: {formatTemp(weather.main.temp_max)}°C</p>
            <p>Min: {formatTemp(weather.main.temp_min)}°C</p>
        </div>
    </div>
  )
}
