...
  constructor() {
    ...
    this.variables = {};
  }

  handleCommand = (command, rowId) => {
    ...
    } else {
      try {
        const result = parser.evaluate(command, this.variables);
        this.showResult(rowId, result.toString());
        const [varName] = command.split('=');
        if (varName) this.variables[varName.trim()] = result;
      } catch (error) {
        ...
      }
    }
  };
...
