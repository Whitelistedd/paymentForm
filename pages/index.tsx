import { TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import type { NextPage } from 'next';
const Home: NextPage = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data : any) => {
    const request = {
      CardNumber: data.Cardnumber,
      ExpDate: `${data.Month}/${data.Year}`,
      Cvv: data.CVV,
      Amount: data.Amount
    }
    const response = await axios.post("/api/orders/",request)
    console.log(response.data)
  }

  return (
    <Container>
      <PaymentForm onSubmit={handleSubmit(onSubmit)} >
        <CardNumberField 
          error={errors.Cardnumber ? true : false} 
          id="outlined-basic" 
          {...register("Cardnumber", { required: true, minLength: 15,maxLength: 16, pattern: /^[0-9]*$/i })} 
          label="Card Number" 
          variant="outlined" 
        />
        <ExpirationWrap>
          
          <ExpirationDate 
            error={errors.Month ? true : false} 
            size="small" 
            {...register("Month", { required: true, maxLength: 2,min: 1,max: 12, pattern: /^[0-9]*$/i })} 
            label="ММ" 
            variant="outlined" 
          />
          /
          <ExpirationDate 
            error={errors.Year ? true : false} 
            size="small" 
            {...register("Year", { required: true, maxLength: 4,min: 2022, pattern: /^[0-9]*$/i })} 
            label="YYYY" 
            variant="outlined" 
          />

          <CVV
            error={errors.CVV ? true : false} 
            size="small" 
            {...register("CVV", { required: true,minLength:1, maxLength: 3, pattern: /^[0-9]*$/i })} 
            label="CVV" 
            variant="outlined"
          />
        </ExpirationWrap>
        <Amount 
          size="small"
          error={errors.Amount ? true : false}
          {...register("Amount", { required: true,min: 1, pattern: /^[0-9]*$/i })}
          label="Amount" 
          variant="outlined" 
        />
        <Submit 
          disabled={errors.Month || errors.Year || errors.CVV || errors.Cardnumber} 
          type="submit"
        >Pay</Submit>
      </PaymentForm>
    </Container>
  );
};

const Submit = styled.button`
  width: 100%;
  height: 20%;
  font-size: 1.2em;
  background-color: #00A985;
  border: none;
  border-radius: 10px;
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  &:disabled {
    color: #c7c3c3;
    background: #05886c;
    &:hover {
      cursor: no-drop;
      opacity: 1;
    }
  }
`

const Amount = styled(TextField)`
  width: 100%;
  box-shadow: 0px 0px 10px #0000008f;
  border-radius: 5px;
`

const ExpirationDate = styled(Amount)`
  width: 20%;
`

const CVV = styled(ExpirationDate)`
  margin-left: auto;
`
const CardNumberField = styled(Amount)`
  width: 100%;
  border-radius: 5px;
  &:hover {
    outline: blac;
  }
  .MuiOutlinedInput-notchedOutline:hover {
    border: 1px solid green;
  }
`

const ExpirationWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  gap: 0.2em;
`


const PaymentForm = styled.form`
  background-color: white;
  width: 400px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  gap: 1em;
  border-radius: 10px;
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Home;
