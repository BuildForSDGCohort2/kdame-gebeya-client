import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { COMBOBOX_DATA, TYPE } from '../../data/combobox.data';
import CustomComboBox from '../custom-combo-box/custom-combo-box.component';
import useStyles from './post-product.styles';
import CustomButton from '../custom-button/custom-button.component';
import CustomInputField from '../custom-input-field/custom-input-field.component';

const PostProduct = ({ postProduct, data, loading }) => {
  const classes = useStyles();

  const [selectedProperties, setSelectedProperties] = useState({
    productName: 'Coffee',
    productPrice: '',
    productQuantity: '',
    productMeasurementUnit: '',
    uniqueAttributes: {
      geographicalDesignation: '',
      grade: '',
      group: '',
    },
  });

  console.log(selectedProperties);
  //const { productName, uniqueAttributes,productPrice,productQuantity,productMeasurementUnit,additionalDescription } = selectedProperties;
  const {
    productName,
    uniqueAttributes,
    productPrice,
    productQuantity,
    productMeasurementUnit,
  } = selectedProperties;
  const handlePostChange = (event, newValue, attributeName) => {
    if (
      attributeName === 'geographicalDesignation' &&
      productName === 'Coffee'
    )
      newValue
        ? (newValue = newValue.specificOrigin)
        : (newValue = '');
    setSelectedProperties({
      ...selectedProperties,
      uniqueAttributes: {
        ...uniqueAttributes,
        [attributeName]: newValue,
      },
    });
  };
  let emptyAttributes = (uniqueAttributes) => {
    const newUniqueAttributes = { ...uniqueAttributes };
    Object.getOwnPropertyNames(newUniqueAttributes).forEach((key) => {
      newUniqueAttributes[key] = '';
    });
    return newUniqueAttributes;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('selectedproducts', selectedProperties);
    postProduct({
      variables: {
        postProductProduct: {
          ...selectedProperties,
        },
      },
    });
    if (!loading && data !== null) {
      console.log('clearing');
      setSelectedProperties({
        productName: '',
        productPrice: '',
        productQuantity: '',
        productMeasurementUnit: '',
        additionalDescription: '',
        uniqueAttributes: emptyAttributes(uniqueAttributes),
      });
      console.log('trypost', data);
    }
  };

  const handleChange = (event) => {
    let { value, name } = event.target;
    if (name === 'productQuantity') {
      value = parseInt(value);
    } else if (name === 'productPrice') {
      value = parseFloat(value);
    }

    setSelectedProperties({ ...selectedProperties, [name]: value });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Typography variant="h4" color="primary">
              Post Product
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid className={classes.eachCombo} item xs={5}>
                <CustomComboBox
                required
                  value={productName}
                  onChange={(event, newValue) => {
                    setSelectedProperties({
                      ...selectedProperties,
                      productName: newValue,
                    });
                    //  newValue===null?filtersVar({uniqueAttributes:emptyAttributes(filtersVar().uniqueAttributes),type:newValue}):
                    //  filtersVar({...filtersVar(), type:newValue})
                  }}
                  id="productName"
                  options={TYPE}
                  getOptionLabel={(option) => option}
                  label="Product Name"
                />
              </Grid>
              <Grid className={classes.eachInput} item xs={5}>
                <CustomInputField
                required
                  normalMargin={true}
                  style={{ width: 200 }}
                  size="small"
                  variant="filled"
                  type="number"
                  value={productQuantity}
                  label="Quantity"
                  name="productQuantity"
                  onChange={handleChange}
                />
              </Grid>
              <Grid className={classes.eachInput} item xs={5}>
                <CustomInputField
                  required
                  normalMargin={true}
                  style={{ width: 200 }}
                  size="small"
                  variant="filled"
                  label="Measurment Unit"
                  name="productMeasurementUnit"
                  type="text"
                  value={productMeasurementUnit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid className={classes.eachInput} item xs={5}>
                <CustomInputField
                required
                  normalMargin={true}
                  style={{ width: 200 }}
                  size="small"
                  variant="filled"
                  label="Price"
                  type="number"
                  value={productPrice}
                  name="productPrice"
                  onChange={handleChange}
                />
              </Grid>

              {productName
                ? COMBOBOX_DATA[productName].map(
                    ({
                      id,
                      handleFilterChange,
                      attributeName,
                      ...allProps
                    }) => (
                      <Grid
                        key={id}
                        className={classes.eachCombo}
                        item
                        xs={5}
                      >
                        <CustomComboBox
                          required
                          value={
                            attributeName ===
                              'geographicalDesignation' &&
                            productName === 'Coffee'
                              ? uniqueAttributes[attributeName]
                                  .specificOrigin
                              : uniqueAttributes[attributeName]
                          }
                          onChange={(e, newValue) => {
                            handlePostChange(
                              e,
                              newValue,
                              attributeName,
                            );
                          }}
                          {...allProps}
                        />
                      </Grid>
                    ),
                  )
                : null}
              {/* <Grid item xs={12}>
            <CustomInputField
              label="additionalDescription"
              value={additionalDescription}
              rows={4}
              multiline
              variant="filled"
              name="Additional Description"
              onChange= {handleChange}
            />
          </Grid> */}
              <Grid className={classes.button} item xs={12}>
                <CustomButton
                  style={{ color: '#121037' }}
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  Post Product
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Grid>
  );
};

export default PostProduct;
