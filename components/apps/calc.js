...
  componentDidMount() {
    this.appendTerminalRow();
    this.startCursor(this.terminalRows - 2);
  }

  startCursor = (id) => {
    clearInterval(this.cursor);
    this.cursor = setInterval(() => {
      const cursor = $(`#cursor-${id}`);
      cursor.css('visibility', cursor.css('visibility') === 'visible' ? 'hidden' : 'visible');
    }, 500);
  };

  stopCursor = (id) => {
    clearInterval(this.cursor);
    $(`#cursor-${id}`).css({ visibility: 'visible' });
  };
...
