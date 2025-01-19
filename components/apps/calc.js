import React, { Component } from 'react';
import $ from 'jquery';

export class Calc extends Component {
  constructor() {
    super();
    this.cursor = "";
    this.terminalRows = 2;
    this.state = { terminal: [] };
  }

  componentDidMount() {
    this.appendTerminalRow();
  }

  appendTerminalRow = () => {
    const terminal = [...this.state.terminal];
    terminal.push(this.terminalRow(this.terminalRows));
    this.setState({ terminal });
    this.terminalRows += 2;
  };

  terminalRow = (id) => (
    <React.Fragment key={id}>
      <div className="flex w-full h-5">
        <div className="text-ubt-green h-1 mr-2">;</div>
        <div id="cmd" className="relative flex-1">
          <span id={`show-calculator-${id}`} className="whitespace-pre pb-1" />
          <div id={`cursor-${id}`} className="w-1.5 h-3.5 bg-white" />
          <input
            id={`calculator-input-${id}`}
            data-row-id={id}
            className="absolute top-0 left-0 w-full opacity-0 outline-none"
            spellCheck={false}
            autoFocus
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
    </React.Fragment>
  );

  render() {
    return (
      <div className="h-full w-full bg-ub-drk-abrgn text-ubt-grey p-1">
        <div>C-style arbitrary precision calculator</div>
        <div id="calculator-body">{this.state.terminal}</div>
      </div>
    );
  }
}

export default Calc;
