const createPaymentIntent = options => {
    return window
      .fetch(`/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw new Error("PaymentIntent API Error");
        } else {
          return data.client_secret;
        }
      });
  };
  
  const getRoomDetails = options => {
    return window
      .fetch(`/bookings/:id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data;
        }
      });
  };
  
  const getPublicStripeKey = options => {
    return window
      .fetch(`/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data.publishableKey;
        }
      });
  };
  
  const api = {
    createPaymentIntent,
    getPublicStripeKey: getPublicStripeKey,
    getRoomDetails: getRoomDetails
  };
  
  export default api;