import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
const fetch = require('isomorphic-fetch');

class CurrentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>Hello</div>
    );
  }
}

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;
    return (
      <Card>
        <Card.Img variant='top' src={item.thumbnail} width='140' height='229'/>
        <Card.Body>
          <div className='text-center'>
            <a href='#' variant='primary'>{item.brand}</a>
          </div>
          <Card.Text>
            {(item.available_price === 'NA' || '') ? '₹ -' : '₹:- ' + item.available_price}
          </Card.Text>
          <Card.Text>
            {item.bundle_name}
          </Card.Text>
          <Card.Text>
            {item.sku}
          </Card.Text>
          <Card.Text>
            {((item.Price_opportunity_increase_by === 'NA' || '') ? 'RS -' : item.Price_opportunity_increase_by)} ({((item.price_opportunity_increase_by_percentage === 'NA') ? '-' : item.price_opportunity_increase_by_percentage)})
          </Card.Text>
          <Card.Text>
            {item.Price_opportunity_days}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.callApi();
  }
  callApi(){
    fetch('https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=all_products&start=0&limit=20&sort_on=&sort_by=&filters={"search":""}&api_key=38430b87ac715c5858b7de91fb90b3f7')
    .then((result) => {
      return result.json();
    }).then((jsonResult) => {
      this.setState({
        items: jsonResult,
        loading: false
      });
    })
  }
  
  render() {
    let content;

    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else { 
      content = this.state.items.data.map((item) => {
        return (
          <div key={item.sku}>
            <Items item={item} />
          </div>
        );
      });
    }
    console.log(this.state, 'hhh');
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'>
            {content}
          </div>
          <div className='col-md-8'>
            <CurrentItem/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
