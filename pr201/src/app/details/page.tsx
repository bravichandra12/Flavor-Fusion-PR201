"use client";

import { useEffect, useState } from 'react';
import Details from '../Components/Details';

export default function DetailsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the Details component on the client side
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return <Details />;
}
