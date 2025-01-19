import React, { Component } from 'react';
import $ from 'jquery';
import { Parser } from 'expr-eval';

const parser = new Parser({
  operators: {
    add: true,
    concatenate: true,
    conditional: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    logical: false,
    comparison: false,
    in: false,
    assignment: true,
  },
});

export class Calc extends Component {
  constructor() {
    super();
    this.cursor = "";
    this.terminalRows = 2;
    this.prevCommands = [];
    this.commandsIndex = -1;
    this.variables = {};
    this.state = { terminal: [] };
  }

  componentDidMount() {
    this.restartTerminal();
  }

  componentDidUpdate() {
    clearInterval(this.cursor);
    this.startCursor(this.terminalRows - 2);
  }

  componentWillUnmount() {
    clearInterval(this.cursor);
  }

  restartTerminal = () => {
    clearInterval(this.cursor);
    $('#calculator-body').empty();
    this.appendTerminalRow();
  };

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
        <div id="cmd" onClick={this.focusCursor} className="relative flex-1">
          <span id={`show-calculator-${id}`} className="whitespace-pre pb-1" />
          <div id={`cursor-${id}`} className="w-1.5 h-3.5 bg-white" />
          <input
            id={`calculator-input-${id}`}
            data-row-id={id}
            onKeyDown={this.checkKey}
            onBlur={this.unfocusCursor}
            className="absolute top-0 left-0 w-full opacity-0 outline-none"
            spellCheck={false}
            autoFocus
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
      <div id={`row-calculator-result-${id}`} className="my-2" />
    </React.Fragment>
  );

  focusCursor = (e) => {
    clearInterval(this.cursor);
    this.startCursor($(e.target).data('row-id'));
  };

  unfocusCursor = (e) => {
    this.stopCursor($(e.target).data('row-id'));
  };

  startCursor = (id) => {
    clearInterval(this.cursor);
    $(`#calculator-input-${id}`).trigger('focus').on('input', function () {
      $(`#cmd span#show-calculator-${id}`).text($(this).val());
    });

    this.cursor = setInterval(() => {
      const cursor = $(`#cursor-${id}`);
      cursor.css('visibility', cursor.css('visibility') === 'visible' ? 'hidden' : 'visible');
    }, 500);
  };

  stopCursor = (id) => {
    clearInterval(this.cursor);
    $(`#cursor-${id}`).css({ visibility: 'visible' });
  };

  checkKey = (e) => {
    const rowId = $(e.target).data('row-id');
    const command = $(`#calculator-input-${rowId}`).val().trim();

    if (e.key === 'Enter' && command) {
      this.handleCommand(command, rowId);
      this.prevCommands.push(command);
      this.commandsIndex = this.prevCommands.length - 1;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this.navigateCommandHistory(e.key === 'ArrowUp', rowId);
    }
  };

  navigateCommandHistory = (isUp, rowId) => {
    this.commandsIndex += isUp ? -1 : 1;
    this.commandsIndex = Math.min(Math.max(this.commandsIndex, -1), this.prevCommands.length);

    const prevCommand = this.commandsIndex < 0 || this.commandsIndex >= this.prevCommands.length
      ? ''
      : this.prevCommands[this.commandsIndex];

    $(`#calculator-input-${rowId}`).val(prevCommand);
    $(`#show-calculator-${rowId}`).text(prevCommand);
  };

  handleCommand = (command, rowId) => {
    const result = this.executeCommand(command) || "Invalid command or expression.";
    document.getElementById(`row-calculator-result-${rowId}`).innerHTML = result;
    this.appendTerminalRow();
  };

  executeCommand = (command) => {
    try {
      if (command === 'clear') {
        this.restartTerminal();
        return '';
      } else if (command === 'exit') {
        $("#close-calc").trigger('click');
        return '';
      } else if (command === 'help') {
        return "Available Commands: clear, exit, help. Math expressions are also supported.";
      }
      return parser.evaluate(command, this.variables);
    } catch {
      return "Error: Invalid expression.";
    }
  };

  render() {
    return (
      <div className="h-full w-full bg-ub-drk-abrgn text-ubt-grey p-1">
        <div>C-style arbitrary precision calculator (version 2.12.7.2)</div>
        <div>Calc is open software.</div>
        <div>[ type "exit" to exit, "clear" to clear, "help" for help. ]</div>
        <div id="calculator-body">{this.state.terminal}</div>
      </div>
    );
  }
}

export default Calc;

export const displayTerminalCalc = (addFolder, openApp) => <Calc addFolder={addFolder} openApp={openApp} />;
