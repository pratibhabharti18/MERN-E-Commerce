import { Component} from 'react';
import AppNavbar from './AppNavbar';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Alert, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, deleteFromCart, updateCart } from '../actions/cartActions';
import Checkout from './Checkout';
import { checkout } from '../actions/orderActions';

class Cart extends Component {
  state = {
    loaded: false,
  }

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    deleteFromCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    checkout: PropTypes.func.isRequired
  }

  getCartItems = async (id) => {
    await this.props.getCart(id);
    this.setState({ loaded: true });
  }

  onDeleteFromCart = (id, itemId) => {
    this.props.deleteFromCart(id, itemId);
  }

  onUpdateQuantity = async (userId, productId, qty) => {
    await this.props.updateCart(userId, productId, qty);
  }

  render() {
    const { user, isAuthenticated, cart } = this.props;

    if (isAuthenticated && !cart.loading && !this.state.loaded) {
      this.getCartItems(user._id);
    }

    return (
      <div>
        <AppNavbar />
        {!isAuthenticated && <Alert color="danger" className="text-center">Login to View!</Alert>}
        {isAuthenticated && !cart.loading && !cart.cart && <Alert color="info" className="text-center">Your cart is empty!</Alert>}

        {isAuthenticated && !cart.loading && this.state.loaded && cart.cart &&
          <Container>
            <div className="row">
              {cart.cart.items.map((item) => (
                <div className="col-md-4" key={item.productId}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">{item.name}</CardTitle>
                      <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                      <div style={qtyBox}>
                        <p style={{ ...qtyBtn, border: "1px solid red", color: "red" }}
                           onClick={() => this.onUpdateQuantity(user._id, item.productId, item.quantity - 1)}>
                          -1
                        </p>
                        <p>Quantity - {item.quantity}</p>
                        <p style={{ ...qtyBtn, border: "1px solid green", color: "green" }}
                           onClick={() => this.onUpdateQuantity(user._id, item.productId, item.quantity + 1)}>
                          +1
                        </p>
                      </div>
                      <Button color="danger" onClick={() => this.onDeleteFromCart(user._id, item.productId)}>Delete</Button>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
              <div className="col-md-12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Total Cost = Rs. {cart.cart.bill}</CardTitle>
                    <Checkout user={user._id} amount={cart.cart.bill} checkout={this.props.checkout} />
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

const qtyBox = { display: "flex", justifyContent: "space-evenly", border: "1px solid #aaa", borderRadius: "5px", padding: "5px 0", marginBottom: "5px" };
const qtyBtn = { padding: "0 5px", borderRadius: "5px", cursor: "pointer" };

export default connect(mapStateToProps, { getCart, updateCart, deleteFromCart, checkout })(Cart);
