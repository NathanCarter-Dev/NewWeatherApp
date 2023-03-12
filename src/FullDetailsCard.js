import React, {Component} from "react";
import {Box, Button, Container, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
class FullDetailsCard extends Component {
  static defaultProps = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
  constructor(props) {
    super(props)

    this.handleHome = this.handleHome.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
    this.handleUnfavourite = this.handleUnfavourite.bind(this);
    
  }
 

  handleHome() {
    this.props.home();
  }

  handleFavourite(evt) {
    this.props.favourite(this.props.id);
  }
  handleUnfavourite(evt) {
    this.props.unfavourite(this.props.id);
  }


  render() {

    const d = new Date();
    let hour = d.getHours();
    
    const hourly = []; //loop over the hourly forecast
    for (let i = 0; i < 6; i++) {
    hourly.push(
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
             <Typography variant="h3">{i === 0 ? 'Now' : this.props.hourlyForecast[hour + i].time.slice(-5)} </Typography>
             <img src={this.props.hourlyForecast[hour + i].condition.icon}/>
             <Typography>{this.props.hourlyForecast[hour + i].chance_of_rain}%</Typography>
             <Typography variant="h5">{this.props.celcius ? this.props.hourlyForecast[hour + i].temp_c : this.props.hourlyForecast[hour + i].temp_f}° </Typography>
          </Box>
    );

    }
    const daily = []; //loop over the hourly forecast
    for (let i = 0; i < 10; i++) {
      let date = new Date(this.props.forecast.forecastday[i].date)
      let day = parseInt(date.getDay());
      let newDay = this.props.days[day];
      console.log(this.props.forecast.forecastday[i].day.condition.text);
      daily.push(
        <Paper sx={{ 
          m: 1}} elevation={1}> 
          <Box sx={{p: '10px',display: 'flex', height:'150px', justifyContent: 'space-around', alignItems: 'center'}}>     
          <Box >
          <Typography  variant="h2">{i === 0 ? 'Today' :newDay} </Typography>
          <Typography>{this.props.forecast.forecastday[i].day.condition.text}</Typography>
          </Box>
          <Box sx={{textAlign: 'center', margin: '0 1em'}}>
              <img sx={{}} src={this.props.forecast.forecastday[i].day.condition.icon}/>
              <Typography sx={{textAlign: 'center'}}>{this.props.forecast.forecastday[i].day.daily_chance_of_rain}%</Typography>
          </Box>
          
          <Box sx={{display:'flex'}}>
          <Typography variant="h1">
                {this.props.celcius 
                ? this.props.forecast.forecastday[i].day.avgtemp_c 
                : this.props.forecast.forecastday[i].day.avgtemp_f}
                °</Typography>
             
          </Box>
          
        </Box>
          </Paper>
        
    );

    }
    return(
      
      <Container>
        
        <Box sx={{borderRadius: '1em'}}>
          
          <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2em'}}>
           <Typography sx={{m: 1, fontSize: '2.5em'}} variant="h1">{this.props.location}</Typography>
           <Typography variant="h2">{this.props.celcius ? this.props.temp_c : this.props.temp_f}°</Typography>
           <Typography sx={{m: 1}} variant="h3">H:{this.props.celcius ? this.props.maxtemp_c : this.props.maxtemp_f}° L:{this.props.celcius ? this.props.mintemp_c : this.props.mintemp_f}°</Typography>
          </Box>
        </Box >
        
      <Container>

          <Button sx={{m: '0 1em 1em 1em', borderColor: 'black', color: 'black'}} 
            onClick={this.handleHome} 
            variant="outlined" 
            startIcon={<HomeIcon />}>Home
            </Button >
            {this.props.isFavourited 
            ? <Button sx={{borderColor: 'red', color: 'red', m: '0 1em 1em 0'}} 
            onClick={this.handleUnfavourite} 
            variant="outlined" 
            startIcon={<DeleteIcon />}>unfavourite 
            </Button>
            : <Button sx={{borderColor: 'green', color: 'green',m: '0 1em 1em 0'}}
            onClick={this.handleFavourite} 
            variant="outlined" 
            startIcon={<FavoriteIcon />}>Favourite
        </Button>}

        <Paper  elevation={4} >
        <Typography sx={{margin: '0em 2em', paddingTop: '1em'}} variant="h4">hourly forecast</Typography>
          <Container sx={{borderRadius: '1em', m: '1em 0', p:4, display:' flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>

             {hourly}   

          </Container>
        </Paper>

        <Paper sx={{paddingBottom: '1em'}} elevation={4} >

        <Typography sx={{margin: '0em 2em', paddingTop: '1em'}} variant="h4">10-day forecast</Typography>
        {daily}
        </Paper>
        
        
        
      </Container>
      </Container>
    )
  }
}

export default FullDetailsCard;