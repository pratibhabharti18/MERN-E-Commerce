import { Component} from 'react';
import AppNavbar from './AppNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import { Card, CardBody, CardTitle, CardSubtitle, Alert, Container } from 'reactstrap';

class Orders extends Component {
  state = { loaded: false }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    getOrders: PropTypes.func.isRequired
  }

  ongetOrders = async (id) => {
    await this.props.getOrders(id);
    this.setState({ loaded: true });
  }

  render() {
    const { user, isAuthenticated, order } = this.props;

    if (isAuthenticated && !order.loading && !this.state.loaded) {
      this.ongetOrders(user._id);
    }

    return (
      <div>
        <AppNavbar />
        {!isAuthenticated && <Alert color="danger" className="text-center">Login to View!</Alert>}
        {isAuthenticated && order.orders.length === 0 && <Alert color="info" className="text-center">You have no orders!</Alert>}

        {isAuthenticated && !order.loading && this.state.loaded && order.orders.length > 0 &&
          <Container>
            <div className="row">
              {order.orders.map((orderItem) => (
                <div className="col-md-12" key={orderItem._id}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">{orderItem.items.length} items - Total cost: Rs. {orderItem.bill}</CardTitle>
                      <div className="row">
                        {orderItem.items.map((item) => (
                          <div className="col-md-4" key={item.productId}>
                            <Card className="mb-2">
                              <CardBody>
                                <CardTitle tag="h5">{item.name} ({item.quantity} pcs)</CardTitle>
                                <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                              </CardBody>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
            </div>
          </Container>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getOrders })(Orders);
