/** @jsx React.DOM */

var React = require('react');

var Stack = React.createClass({
  render: function() {
    var cpu = this.props.cpu;
    var stack = cpu.stack;

    var addresses = Object.keys(stack).map(function(key) {
      var value = stack[key];
      return (
        <div
          key={key}
          className='address'>
          <strong>{key}</strong>
          <span>{value}</span>
        </div>
      );
    });

    return (
      <div className="memory">
        {addresses}
      </div>
    );
  }
});

var Memory = React.createClass({
  render: function() {
    var cpu = this.props.cpu;
    var memory = cpu.memory;

    var isCurrent = function(key) {
      return key == cpu.registers.rip ? 'current' : '';
    };

    var addresses = Object.keys(memory).map(function(key) {
      var instr = memory[key];
      return (
        <div
          key={key}
          className={isCurrent(key) + ' address'}>
          <strong>{key}</strong>
          <span>{instr}</span>
        </div>
      );
    });

    return (
      <div className="memory">
        {addresses}
      </div>
    );
  }
});

var Computer = React.createClass({
  render: function() {
    var cpu = this.props.cpu;

    var registers = Object.keys(cpu.registers).map(function(key) {
      var value = cpu.registers[key];
      return (
        <td
          className="register"
          key={key}>
          <h5>{key}</h5>
          <div>{value}</div>
        </td>
      );
    });

    return (
      <div className="computer">
        <table>
          <tr>
            {registers.slice(0, 4)}
          </tr>
          <tr>
            {registers.slice(4, 8)}
          </tr>
          <tr>
            {registers.slice(8, 12)}
          </tr>
        </table>
        <table>
          <tr>
            <td style={{width: '50%'}}>
              <Memory cpu={this.props.cpu} />
            </td>
            <td style={{width: '50%'}}>
              <Stack cpu={this.props.cpu} />
            </td>
          </tr>
        </table>
      </div>
    );
  }
});
