...
export class Calc extends Component {
  constructor() {
    super();
    this.prevCommands = [];
    this.commandsIndex = -1;
    ...
  }

  checkKey = (e) => {
    const rowId = $(e.target).data('row-id');
    const command = $(`#calculator-input-${rowId}`).val().trim();

    if (e.key === 'Enter' && command) {
      this.prevCommands.push(command);
      this.commandsIndex = this.prevCommands.length;
      this.handleCommand(command, rowId);
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
    if (command === 'clear') {
      this.setState({ terminal: [] });
      this.appendTerminalRow();
    } else if (command === 'help') {
      const result = 'Available Commands: clear, help.';
      this.showResult(rowId, result);
    }
  };

  showResult = (rowId, result) => {
    $(`#row-calculator-result-${rowId}`).html(result);
    this.appendTerminalRow();
  };

