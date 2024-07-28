import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardComponentProps {
  apiUrl: string;
  name: string;
}

const CardComponent2: React.FC<CardComponentProps> = ({ apiUrl, name }) => {
  const [numNames, setNumNames] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const namesCount = data.filter(
          (item: { id: string }) => item.id
        ).length;
        setNumNames(namesCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <Card sx={{ maxWidth: 200 }}>
      {' '}
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6">{numNames}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent2;
