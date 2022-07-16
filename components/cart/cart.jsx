import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Cartitem from "./cartitem/cartitem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdateCartqty,
  handleReomveFromCart,
  handleEmptyCart,
}) => {
  console.log(cart);
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          start adding some
        </Link>
        !
      </Typography>
    );
  };
  const FillCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <Cartitem
                item={lineItem}
                handleUpdateCartqty={handleUpdateCartqty}
                handleReomveFromCart={handleReomveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty cart
            </Button>
            <Button
              className={classes.checkoutButton}
              to="/checkout"
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  if (!cart.line_items) return "Loading";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FillCart />}
    </Container>
  );
};

export default Cart;
