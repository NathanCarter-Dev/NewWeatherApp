import React, {Component} from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


class WeatherSearchForm extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      search: '',
      deg: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})

    if(evt.target.value === true || evt.target.value ===  false) {
      this.setState({[evt.target.name]: evt.target.value})
      this.props.changeDeg(evt.target.value);
    }
    
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.search(this.state.search);
    this.setState({search: ''})
  }


  render() {
    return(
      
      <Container sx={{color: 'black', marginTop: '2em', display: 'flex'}}>
        
        <form style={{minWidth: '80%'}} onSubmit={this.handleSubmit}>
          <Typography  variant="h1">Weather</Typography>
          <TextField sx={{width: '100%'}} id="standard-basic" label="Search for a city..." variant="standard"  
          onChange={this.handleChange}
          name='search'
          value={this.state.search}
          type='text'
          placeholder="Search for a city"/>
        </form>

        <FormControl sx={{ m: 'auto', minWidth: '10%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Units</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={this.state.deg}
          onChange={this.handleChange}
          name='deg'
          autoWidth
          label="Age"
        >
          <MenuItem value="celcius">
          </MenuItem>
          <MenuItem value={true}>celcius</MenuItem>
          <MenuItem value={false}>farenheit</MenuItem>
          
        </Select>

      </FormControl>
      </Container>
    )
  }
}

export default WeatherSearchForm;