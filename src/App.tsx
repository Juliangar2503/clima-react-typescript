import styles from "./App.module.css"
import Form from "./components/Form/Form"
import Spinner from "./components/Spinner/Spinner"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"

function App() {

  const { weather, fetchWeather, loading, notFound,  hasWeatherData } = useWeather()
  return (

    <>
      <h1 className={styles.title}>Buscador clima</h1>
      <div className={styles.container}>

        <Form
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner />}
        {hasWeatherData &&
          <WeatherDetail
            weather={weather}
          />
        }
        {notFound && <p>No se encontró datos para la ciudad</p>}
      </div>
    </>
  )
}

export default App
