
var React = window.React = require('react'),
    ReactDOM = require("react-dom");

var mountNode = document.getElementById("app");


var PokemonImage = React.createClass({
  render: function() {
    return (
      <img src={"http://pokeapi.co/media/img/" + this.props.id + ".png"} />
    );
  }
});


var PokemonType = React.createClass({
  render: function() {
    return (
      <span className={this.props.type.name}>{this.props.type.name} </span>
    );
  }
});

var Pokemon = React.createClass({

  getInitialState: function() {
    return {
      name: '',
      id: '',
      types: []
    }
  },

  componentDidMount: function() {

    $.get('http://pokeapi.co/api/v1/pokemon/' + this.props.id + '/', function(result) {
      if (this.isMounted()) {
        this.setState({
          name: result.name,
          id: result.pkdx_id,
          types: result.types,
        });
      }
    }.bind(this));

  },

  render: function() {

    return (
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <PokemonImage id={this.state.id} />
            <div className="caption">
              <h3>{this.state.name}</h3>
              <div className="pokemon-types">
                {this.state.types.map(function(type){
                    return <PokemonType type={type} />
                })}
              </div>
              <p>
                <a href="#" className="btn btn-primary" role="button">Button</a>
              </p>
            </div>
          </div>
        </div>
    );
  }
});

var PokedexList = React.createClass({

  getInitialState: function() {
    var total = 778;
    var list = [];

    for (var i=1; i <= 25; i++){
      list.push(i);
    }
    return {
      list: list
    }
  },



  render: function() {
    return (
      <div className="row">
        {this.state.list.map(function(pokemon){
            return <Pokemon id={pokemon} />
        })}
      </div>
    );
  }
});

var Pokedex = React.createClass({
  getInitialState: function() {
    return { text: '' };
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div>
        <div>
          <h3>Find your Pokèmon</h3>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.onChange} value={this.state.text} />
          </form>
          <br/>
        </div>
        <div className="pokedex-container">
          <PokedexList source="http://pokeapi.co/api/v1/pokedex/1/" />
        </div>
      </div>
    );
  }
});


ReactDOM.render(<Pokedex />, mountNode);

