import React, { Component, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import "bootswatch/dist/solar/bootstrap.min.css";
import './animate.css';

class RandomUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        users: response.results,
        loading: true
      })
    })
  }


  render() {

    

    let {users, loading} = this.state;

    if (!loading) {
      return (
        <div id="loader"></div>
      )
    } else {
        return (
          <main>
            <section className="container w-100 min-vh-100 d-flex justify-content-center align-items-center">
              {users.map((user) => (
                <div className="card text-white bg-primary my-5  py-4 sm:w-50" style={{maxWidth: "450px"}} key='1' >
                  <div className="img-container w-50 mx-auto mt-2">
                    <Image picture={user.picture} name={user.name} />
                  </div>
                  <div className="card-body pt-2">
                    <UserName name={user.name} />
                    <UserID login={user.login} />
                    <UserEmail email={user.email} />
                    <UserPhone phone={user.phone} />
                    <UserAddress location={user.location} />
                    <div className="d-flex text-center">
                      <Button />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        )
      }
  }
}

const Image = ({ picture, name }) => <img src={picture.medium} className="card-img-top img-fluid rounded-circle border border-5 border-white mx-auto mb-4" alt={name.first} id='image' />;

const UserName = ({ name }) => <h2 className="display-6 lead fw-bold pb-3 text-center">{name.title} {name.first} {name.last}</h2>;

const UserID = ({ login }) => <p className='fs-5 fw-light d-flex align-items-center gap-3 py-1'><i className="fa fa-user" /> <span>{login.username}</span></p>;

const UserEmail = ({ email }) => <p className='fs-5 fw-light d-flex flex-wrap align-items-center gap-3 pb-1'><i className="fa-solid fa-envelope" /> <span>{email}</span></p>;

const UserPhone = ({ phone }) => <p className='fs-5 fw-light d-flex align-items-center gap-3 pb-1'><i className="fa-solid fa-phone" /> <span>{phone}</span></p>;

const UserAddress = ({ location }) => {
  const {street, city, state, country} = location;
  return (
    <p className='fs-5 fw-light d-flex gap-3 align-items-center'><i className="fa-solid fa-location-dot" /> <span>{street.number} {street.name}, {city}, {state}, {country}</span></p>
  )
}

const Button = () => <button className='btn btn-lg btn-success mt-4 mx-auto' onClick={() => window.location.reload(true)}>Next User</button>

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <RandomUsers />
  </StrictMode>
)