import React, {useState,useEffect} from 'react';
import { Container, Box, Typography, Button, TextField} from '@mui/material';

const ProductDetail = () => {

  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('url');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePlaceOrder = () => {
    console.log(`Placing order for ${quantity} items`);
  };

  return (
    <Container>
      <Box 
        display="flex" 
        justifyContent="center" 
        marginTop={3} 
        marginLeft = {5} 
        padding={2}
      >
        
        <Box width={400} height={400}>
          <img  src={data.imageUrl} 
                alt={data.name} 
                style={{ width: '80%', height: '80%', objectFit: 'cover' }}
          />
        </Box>

        <Box 
          flex={1}
          padding={2}
          width={400}
          height={600}
          textAlign="left"
          marginTop={2}
        >

          <div>
            <Box display="flex" alignItems="center">
              <Typography variant="h4">{data.name}</Typography>
              <Box
                display="inline-block"
                marginLeft={1}
                bgcolor="#3d4ab1"
                color="white"
                borderRadius="40px"
                padding={1}
                height={12}
                alignContent={'center'}
                fontSize={12}
              >
                Available Quantity: {data.availableItems}
              </Box>
            </Box>
          </div>


          <div>
            <Typography variant="subtitle1">
            Category: <b>{data.category}</b>
            </Typography>
          </div>

          <div>
            <Typography variant="subtitle2" fontStyle="italic" marginTop={1}>
            {data.description}
            </Typography>
          </div>

          <div>
            <Typography variant="h6" color="red" marginTop={1}>
            ₹ {data.price}
            </Typography>
          </div>
          
          <div>
            <TextField
              required
              label="Enter quantity"
              id="outlined-required"
              margin="normal"
              value={quantity}
              sx={{ width: '300px' }}
              onChange={handleQuantityChange}
            />
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <Button 
              marginTop={3} 
              variant="contained" 
              sx ={{bgcolor:"#3d4ab1",color:"white"}}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>

        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;