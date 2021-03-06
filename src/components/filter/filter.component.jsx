import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomComboBox from '../custom-combo-box/custom-combo-box.component';
import {
   TYPE, COMBOBOX_DATA
} from '../../data/combobox.data';
import useStyles from './filter.styles';
import {filtersVar} from '../../apollo/cache';
import {GET_ALL_FILTERS} from '../../apollo/filter/filter.operations';
import { useQuery } from '@apollo/react-hooks';

const Filter=()=>{
  const { data } = useQuery(GET_ALL_FILTERS);
  const {filters} = data;
  const {productName}=filters;
  const classes = useStyles();
  let emptyAttributes = (uniqueAttributes)=>{
    const newUniqueAttributes={...uniqueAttributes}
    Object.getOwnPropertyNames(newUniqueAttributes).forEach((key)=>{newUniqueAttributes[key] =''});
    return newUniqueAttributes;
  }

  const handleFilterChange = (event,newValue,attributeName) =>{
    console.log(attributeName)
    attributeName==='geographicalDesignation'&& productName==='Coffee'?
    filtersVar({
      ...filtersVar(),
      uniqueAttributes: {
        ...filtersVar().uniqueAttributes,
      geographicalDesignation: newValue ? newValue.specificOrigin : '',
      },
    }):
    filtersVar({
      ...filtersVar(),
      uniqueAttributes: { ...filtersVar().uniqueAttributes, [attributeName]: newValue },
    });

  }
  return(
    <div className={classes.root}>
        <Grid container spacing={2}>

        <Grid container justify='center' alignItem='center' item xs={12} lg={1}>
            <Typography className={classes.filterText}>Filter By</Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={2} >
        <CustomComboBox
        value={productName}
        onChange={(event, newValue) => {
         newValue===null?filtersVar({uniqueAttributes:emptyAttributes(filtersVar().uniqueAttributes),productName:newValue}):
         filtersVar({...filtersVar(), productName:newValue})

        }}
        id="type"
        options={TYPE}
        getOptionLabel={(option)=>(option)}
        label='Type'
        />
         </Grid>
        {
         productName?
          COMBOBOX_DATA[productName].map(
            ({id , attributeName ,...allProps})=>( 
               <Grid key={id} item md={6} xs={12} lg={2}>
              <CustomComboBox 
              onChange={(event,newValue)=>{handleFilterChange(event,newValue,attributeName)}}
              {...allProps}/>
              </Grid>)
          ):null
        
        }
       
        </Grid>
        </div>)



}

export default Filter;
