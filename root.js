/** @jsx React.DOM */

var React = require('react');
var x64 = require('x64js');

var OpList = React.createClass({
  render: function() {
    var toLi = function(op) { return <li>{op}</li>; };
    var ops = this.props.instructions.slice().reverse();
    var lis = ops.map(toLi);
    return (<ul>{lis}</ul>);
  }
});

var RootComponent = React.createClass({

  getInitialState: function() {
    return {
      cpu: x64.aBlankCpu(),
      instruction: '',
      instructions: []
    };
  },

  onChange: function(event) {
    this.setState({
      instruction: event.target.value
    });
  },

  onKeyDown: function(event) {
    var instruction = event.target.value;
    if (event.keyCode === 13) {
      var cpu = this.state.cpu;
      cpu = x64.executeInstruction(cpu, instruction);
      var instructions = this.state.instructions.concat([instruction]);
      this.setState({
        cpu: cpu,
        instruction: '',
        instructions: instructions
      });
    }
  },

  render: function() {
    var cpu = x64.aBlankCpu();
    return (
      <div>
        <input
          type="text"
          value={this.state.instruction}
          placeholder="mov rbx 8"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          />
        <Computer cpu={this.state.cpu} />
        <OpList instructions={this.state.instructions} />
      </div>
    );
  }

});

var root = document.getElementById('react-root');
React.renderComponent(RootComponent(), root);
