
import React, {Component} from 'react'
import {FormField, Label} from 'semantic-ui-react';
import withExternalLib from '../utils/scriptLoad';
import PlacesAutocomplete from 'react-places-autocomplete';


const renderInput = ({getInputProps, getSuggestionItemProps, suggestions, loading}) => {

  return (
    <div className="autocomplete-root">
      <input {...getInputProps()}/>
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)}>
            <strong>
              {suggestion.formattedSuggestion.mainText}
            </strong>
            <small>
              {suggestion.formattedSuggestion.secondaryText}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
};

class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  handleError = (status, clearSuggestions) => {
  
    this.setState({
      errorMessage: status
    }, () => {
      clearSuggestions();
    });
  };

 

  render() {
    const {
      input: {
        value,
        onChange,
        ...restInputProps
      },
      width,
      placeholder,
      onSelect,
      options,
      meta: {
        touched,
        error
      }
    } = this.props;
   
    return (

      <FormField error={touched && !!error} width={width}>
      
          {this.props.scriptLoaded && <PlacesAutocomplete
          searchOptions ={options} 
          onSelect={onSelect}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onError={this.handleError}
          inputProps={{
          ...restInputProps
        }}>{renderInput}</PlacesAutocomplete>
}
        {touched && error && <Label basic color='red'>{error}</Label>
}
      </FormField>
    )
  }
}

export default  withExternalLib(PlaceInput);