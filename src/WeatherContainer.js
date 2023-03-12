import React, {Component} from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherSearchForm from "./WeatherSearchForm";
import { v4 as uuidv4 } from 'uuid';
import FullDetailsCard from "./FullDetailsCard";

class WeatherContainer extends Component {

  static defaultProps = {
    
  }
  constructor(props) {
    super(props)

    this.state = {
      weatherCards: JSON.parse(window.localStorage.getItem("weather")) || [],
      fullDetails: false,
      weatherFull: JSON.parse(window.localStorage.getItem("weatherFull")) || {isFavourited: false},
      celcius: true
      
    }
    
    //binds
    this.moreDetails = this.moreDetails.bind(this);
    this.home = this.home.bind(this);
    this.searchWeather = this.searchWeather.bind(this);
    this.favourite = this.favourite.bind(this);
    this.unfavourite = this.unfavourite.bind(this);
    this.changeDeg = this.changeDeg.bind(this);

  }

  componentDidUpdate() {
    window.localStorage.setItem("weather", JSON.stringify(this.state.weatherCards));
    window.localStorage.setItem("weatherFull", JSON.stringify(this.state.weatherFull));
  }
  async componentDidMount() {
    const defaultCard = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=578cee7508c9453187193954231003&q=London&days=10&aqi=no&alerts`);

    if(this.state.weatherCards.length === 0) {  //get default data for london for first weather card
      this.setState({weatherCards: [{...defaultCard.data, id: uuidv4(), isFavourited: true}]})
      
    } else {
      
    }
    
  }

  changeDeg(unit) {
    
    this.setState({celcius: unit});
  }

  renderWeatherCards() {  //render homepage weather cards
    return this.state.weatherCards.map((card) => ( <WeatherCard celcius={this.state.celcius} icon={card.current.condition.icon} isFavourited={true} fullDetails={false} moreDetails={this.moreDetails} key={card.id} id={card.id} location={card.location.name} temp_f={card.current.temp_f} temp_c={card.current.temp_c} text={card.current.condition.text}/>))
  }



  home() { //go back to the home screen displaying all weather cards
    this.setState({fullDetails: false})
  }

  unfavourite(id) {
    this.setState({weatherCards: this.state.weatherCards.filter((card) => card.id !== id)})
    this.home();
  }

  favourite(id) {
    const newWeather = {...this.state.weatherFull[0], id: uuidv4(), isFavourited: true};

    //map over each weather and check if currweather.location.name === newWeather.location.name
    this.setState((st) => ({weatherCards: [...st.weatherCards, newWeather]}))
    this.home();
  }

    async moreDetails(q, id, isFavourited) { //handle more details button logic and display full card details
      await this.setState((st) => ({isFavourited: isFavourited, fullDetails: true, weatherFull: this.state.weatherCards.filter((card) => card.id === id)}))
      this.renderFullDetails();
    }
  async searchWeather(q) {  //search form result then execute into render full details for the search query
    try {
      const search = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=578cee7508c9453187193954231003&q=${q}&days=10&aqi=no&alerts`)
      const data = [search.data]
      this.setState((st) => ({fullDetails: true, weatherFull: data, id: uuidv4()}))
      this.renderFullDetails();
    }
    catch(e) {
      
    }
  }

  renderFullDetails() { //render the full details card
   
    const card = this.state.weatherFull[0];

    return <FullDetailsCard
     celcius={this.state.celcius}
     isFavourited={card.isFavourited}
     unfavourite={this.unfavourite}
     favourite={this.favourite}
     home={this.home}
     fullDetails={true} 
     key={card.id} 
     id={card.id} 
     location={card.location.name} 
     temp_f={card.current.temp_f} 
     temp_c={card.current.temp_c} 
     text={card.current.condition.text}
     forecast={card.forecast}
     maxtemp_c={card.forecast.forecastday[0].day.maxtemp_c}
     maxtemp_f={card.forecast.forecastday[0].day.maxtemp_f}
     mintemp_c={card.forecast.forecastday[0].day.mintemp_c}
     mintemp_f={card.forecast.forecastday[0].day.mintemp_f}
     hourlyForecast={card.forecast.forecastday[0].hour}
     />
     
  }

  render() {
    return(
      !this.state.fullDetails //check whether user is viewing full details of a location or viewing their homepage/favourites
      ? 
      <div>
        
       <WeatherSearchForm changeDeg={this.changeDeg} search={this.searchWeather}/>
       {this.renderWeatherCards()}
      </div>
      :
      <div>
       <WeatherSearchForm changeDeg={this.changeDeg} search={this.searchWeather}/>
       {this.renderFullDetails()}
      </div>
      
    )
  }
}

export default WeatherContainer;

//create weather location cards  ----------------
//map through weather location cards on homepage.  -------------------------
//add ids to locations using UUID ----------------
//add removable locations by filtering over existing cards and checking whether id !match
//add WeatherFullsize which shows more details about the location
//add WeatherSearchForm which displays full size display showing more details of search weather.
//Create more details on this page displaying hourly and daily forecast
//add option to favourite this weather adding it into the 'weather locations' array to be mapped on homepage
//add button to close and switch over to favourites display
//Implement MUI components
//create button to switch between farenheit and celsc

