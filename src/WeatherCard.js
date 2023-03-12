import {Box, Button, Container, Paper, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import React, {Component} from "react";
import './App.css';

class WeatherCard extends Component {
  constructor(props) {
    super(props)

    this.handleMoreDetails = this.handleMoreDetails.bind(this);
  }

  handleMoreDetails() {
    this.props.moreDetails(this.props.location, this.props.id, this.props.isFavourited);
  }

  render() {
    
    return(
        
        <Container onClick={this.handleMoreDetails} sx={{color: 'black', bgcolor: '', m: '2em auto'}}>
          
          <Paper sx={{borderRadius: '1em', cursor: 'pointer', 
          "&:hover": {backgroundColor: 'lightgrey'}, transition: '0.2s all'}} elevation={4}> 
          <Box sx={{p: '10px',display: 'flex', height:'150px', justifyContent: 'space-around', alignItems: 'center'}}>     
          <Box >
            <Typography variant="h2">{this.props.location}</Typography>  
            <Typography >{this.props.text}</Typography>     
          </Box>
           <img src={this.props.icon}/>
          
          <Box sx={{display:'flex'}}>
             <Typography sx={{fontSize: '2.5em'}} variant="h2">{this.props.celcius ? this.props.temp_c : this.props.temp_f}°</Typography>
             
          </Box>
          
        </Box>
          </Paper>
        </Container>
        
      
    )
  }
}

export default WeatherCard;