const allowedOperations = ['move', 'insert', 'delete'];

class Operation {
  constructor() {}

  setOperation(op) {
    this.operations = op;
  }

  static compose(op1, op2) {
    return op1.concat(op2);
  }

  compose(op) {
    const offset = this.operations.filter(o=>o.move).reduce((a,n) => a + n.move, 0);
    op[0].move = op[0].move <= offset ? 0 : op[0].move - offset;
    this.operations = this.operations.concat(op);


    return this.operations;
  }

  get() {
    return this.operations;
  }

  move(string, pos, to) {
    if (string.length - pos <= to)
      return string.length;

    return pos + to;
  }

  insert(string, pos, str) {
    return string.slice(0, pos) + str + string.slice(string.slice(0, pos).length);
  }

  delete(string, pos, del) {
    return string.slice(0, pos) + string.slice(string.slice(0, pos).length + del);
  }

  apply(string) {
    let pos = 0;

    this.operations.forEach(op=>{
      const key = Object.keys(op)[0];

      switch (key) {
        case 'move':
          pos = this.move(string, pos, op[key]);
          break;
        case 'insert':
          string = this.insert(string, pos, op[key]);
          break;
        case 'delete':
          string = this.delete(string, pos, op[key]);
          break;
      }
    });


    return string;
  };

}

module.exports = Operation;