import React, { Component } from 'react';

import Modal from './Modal';
import Settings from '../Settings';

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: this.props.phrase,
      open: this.props.open || false,
      translations: [],
      status: this.props.phrase.fields.status
    };
  }

  toggleModal = (e) => {
    console.log('toggling DeckItem modal')
    this.setState(state => ({
      open: !this.state.open
    }));
    e.preventDefault();
  }

  closeModal = (e) => {
    console.log('closing DeckItem modal');
    this.setState(state => ({
      open: false
    }));
    // e.preventDefault();
  }

  componentDidMount() {
    fetch(`${Settings.API_URL}Translations/?api_key=${Settings.API_KEY}&filterByFormula=%7Bphrase_id%7D%3D%22${this.props.phrase.fields.id}%22`)
      .then((resp) => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          translations: data.records
        })
      })
      .catch(err => {
        // Error 🙁
      });
  }

  render() {
    return (
      <div className="card w-100 shadow-sm mb-3 d-flex justify-content-between">
        <div className="card-body">
          <p className="card-text float-left mb-0">
            <span className={`badge badge-${this.state.status === 'active'? 'primary': this.state.status === 'learned' ? 'success' : 'danger'}`}>{this.state.status}</span>
            <span> {this.state.phrase.fields.text}</span>
          </p>
          <div className="btn-group float-right">
            <button className="btn btn-sm btn-outline-secondary" onClick={this.toggleModal}>
              Show
            </button>
          </div>
        </div>
        { this.state.open?
          <Modal title={this.state.phrase.fields.text}
              new_url={'/deck/' + this.props.phrase.fields.language_name + '/card/' + this.props.phrase.id}
              back_url={'/deck/' + this.props.phrase.fields.language_name}
              close_text="Close (go back)"
              closeModal={this.closeModal}
              >
            <div className="modal-header bg-primary text-white">
              <h3 className="modal-title">
                {this.state.phrase.fields.text}
              </h3>
            </div>
            <div className="modal-body overflow-auto">
              <p>translations:</p>
              {this.state.translations.map(t => (
                <blockquote className="blockquote border-left pl-3" key={t.id}>
                  <p className="mb-0">{t.fields.text}</p>
                  { t.fields.language_name?
                  <span className="text-muted small">{t.fields.language_name}</span>
                  : <></> }
                </blockquote>
              ))}
            </div>

            <div className="btn-group p-3 btn-group-toggle" data-toggle="buttons">
              <button onClick={() => this.setState({status: 'learned'})} className={`btn ${this.state.status === 'learned' ? 'btn-success' : 'btn-outline-success'}`}>
                Done!
              </button>
              <button onClick={() => this.setState({status: 'active'})} className={`btn ${this.state.status === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}>
                Learning
              </button>
              <button onClick={() => this.setState({status: 'rejected'})} className={`btn ${this.state.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}>
                Dismiss
              </button>
            </div>
          </Modal>
          :
          <></>
        }
      </div>
    )
  }
}

export default DeckItem;
