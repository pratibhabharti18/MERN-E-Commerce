import React, { Component } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import { addToCart } from "../actions/cartActions";

class Home extends Component {
  state = {
    loading: true,
    addedProductId: null, // track which product was added
  };

  async componentDidMount() {
    await this.props.getItems();
    this.setState({ loading: false });
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    addToCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  onAddToCart = async (userId, productId) => {
    await this.props.addToCart(userId, productId, 1);
    this.setState({ addedProductId: productId });
    setTimeout(() => this.setState({ addedProductId: null }), 2000); // hide toast after 2s
  };

  render() {
    const { items } = this.props.item;
    const { loading, addedProductId } = this.state;
    const user = this.props.user;

    return (
      <div>
        <AppNavbar />
        <Container className="mb-5">
          {loading ? (
            <div className="text-center mt-5">
              <Spinner color="primary" />
            </div>
          ) : items.length ? (
            <Row>
              {items.map((item) => (
                <Col md="4" sm="6" xs="12" key={item._id}>
                  <Card className="mb-4 shadow-sm card-hover">
                    <CardBody>
                      <CardTitle tag="h5">{item.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted">
                        Rs. {item.price}
                      </CardSubtitle>
                      <CardText>{item.category}</CardText>
                      {this.props.isAuthenticated ? (
                        <Button
                          color="success"
                          size="sm"
                          disabled={addedProductId === item._id}
                          onClick={() =>
                            this.onAddToCart(user._id, item._id)
                          }
                        >
                          {addedProductId === item._id
                            ? "Added!"
                            : "Add to Cart"}
                        </Button>
                      ) : (
                        <Button color="secondary" size="sm" disabled>
                          Login to Add
                        </Button>
                      )}

                      {addedProductId === item._id && (
                        <div className="mt-2">
                          <Toast className="p-2 bg-light border border-success">
                            <ToastHeader icon="success">Success</ToastHeader>
                            <ToastBody>Item added to cart!</ToastBody>
                          </Toast>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center mt-5">
              <Alert color="info">No products found.</Alert>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, addToCart })(Home);
