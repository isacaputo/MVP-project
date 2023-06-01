import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/AddressForm";
import Review from "../components/Review";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Dados do Cliente", "Revise e Finalize o Pedido"];

export const Checkout = ({ cart, onSuccess }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const saveOrder = async () => {
    try {
      setLoading(true);
      const { firstName, lastName, email, phone, address, city, state, zip } =
        orderDetails;
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map(({ id, size, quantity }) => {
            return {
              id,
              size,
              quantity,
            };
          }),
          clientName: `${firstName} ${lastName}`,
          clientEmail: email,
          clientPhone: phone,
          clientAddress: `${address}, ${city}, ${state}, ${zip}`,
        }),
      });
      const data = await response.json();
      setOrderId(data.orderId);
      setSuccess(true);
      onSuccess();
      setLoading(false);
      setActiveStep(activeStep + 1);
    } catch (err) {
      console.log(err);
      // todo set error
    }
  };

  const handleNext = () => {
    if (activeStep === 1) {
      saveOrder();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDataChange = (entry) => {
    setOrderDetails(() => {
      return {
        ...orderDetails,
        [entry.name]: entry.value,
      };
    });
  };

  const isValidAddress = () => {
    const objectValues = Object.values(orderDetails);
    return objectValues.every((input) => input !== "");
  };

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={1}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" color="inherit" noWrap>
            Detalhes do Pedido
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4, justifyContent: "center" }}
      >
        {cart.length === 0 && success === false ? (
          <Container>
            <Typography>Seu carrinho está vazio!</Typography>
          </Container>
        ) : (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Recebemos o seu pedido!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  O número do seu pedido é: #{orderId}. Agradecemos por escolher
                  os nossos queijos para dar ainda mais sabor à sua vida!
                  Acabamos de te enviar um e-mail com a confirmação do pedido.
                  Em breve, entraremos em contato para detalhamento da entrega e
                  frete. Até mais! ;)
                </Typography>
                <br />
                <Button
                  onClick={() => navigate(`/products`)}
                  variant="outlined"
                >
                  Ir para cardápio de queijos
                </Button>
              </>
            ) : (
              <>
                {activeStep === 0 && (
                  <AddressForm
                    value={orderDetails}
                    onChange={handleDataChange}
                  />
                )}
                {activeStep === 1 && (
                  <Review address={orderDetails} cart={cart} />
                )}
                {activeStep !== steps.length && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Voltar
                      </Button>
                    )}
                    <LoadingButton
                      variant="contained"
                      onClick={() => handleNext(cart)}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={!isValidAddress()}
                      loading={loading}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar Pedido"
                        : "Continuar"}
                    </LoadingButton>
                  </Box>
                )}
              </>
            )}
          </Paper>
        )}
      </Container>
    </>
  );
};
