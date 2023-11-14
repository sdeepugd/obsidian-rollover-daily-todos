class TodoParser {
  // List of strings that include the Markdown content
  #lines;

  // Boolean that encodes whether nested items should be rolled over
  #withChildren;

  #templateHeading;

  constructor(lines, templateHeading, withChildren) {
    this.#lines = lines;
    this.#templateHeading = templateHeading;
    this.#withChildren = withChildren;
  }

  // Returns true if string s is a todo-item
  #isTodo(s) {
    const r = /\s*- \[ \].*/g;
    return r.test(s);
  }

  // Returns true if string s is a todo-item
  //- [x]
  #isTodoChecked(s) {
    console.log(s);
    const r = /- \[x\]/;
    return r.test(s);
  }

  // Returns true if line after line-number `l` is a nested item
  #hasChildren(l) {
    if (l + 1 >= this.#lines.length) {
      return false;
    }
    const indCurr = this.#getIndentation(l);
    const indNext = this.#getIndentation(l + 1);
    if (indNext > indCurr) {
      return true;
    }
    return false;
  }

  // Returns a list of strings that are the nested items after line `parentLinum`
  #getChildren(parentLinum) {
    const children = [];
    let nextLinum = parentLinum + 1;
    while (this.#isChildOf(parentLinum, nextLinum)) {
      children.push(this.#lines[nextLinum]);
      nextLinum++;
    }
    return children;
  }

  // Returns true if line `linum` has more indentation than line `parentLinum`
  #isChildOf(parentLinum, linum) {
    if (parentLinum >= this.#lines.length || linum >= this.#lines.length) {
      return false;
    }
    return this.#getIndentation(linum) > this.#getIndentation(parentLinum);
  }

  // Returns the number of whitespace-characters at beginning of string at line `l`
  #getIndentation(l) {
    return this.#lines[l].search(/\S/);
  }

  #getHeadingLevel(heading) {
    const headingLevelstr = heading.split(" ")[0];
    let currHeadingLevel = headingLevelstr.length;
    return currHeadingLevel;
  }

  #findStringDifferences(str1, str2) {
    const differences = [];
    const maxLength = Math.max(str1.length, str2.length);

    for (let i = 0; i < maxLength; i++) {
      if (str1[i] !== str2[i]) {
        differences.push({
          index: i,
          char1: str1[i] || "",
          char2: str2[i] || "",
        });
      }
    }

    return differences;
  }

  // Returns a list of strings that represents all the todos along with there potential children
  getTodos() {
    let todos = [];
    let headingFound = false;
    let headingLevel = this.#getHeadingLevel(this.#templateHeading);
    for (let l = 0; l < this.#lines.length; l++) {
      const line = this.#lines[l];
      console.log(this.#templateHeading, line);
      if (headingFound) {
        if (line.startsWith("#")) {
          const words = line.split(" ");
          if (words.length > 1) {
            console.log(line);
            let currentHeadingLevel = this.#getHeadingLevel(line);
            if (currentHeadingLevel <= headingLevel) {
              headingFound = false;
              break;
            } else {
              todos.push(line);
            }
          }
        } else {
          if (!this.#isTodoChecked(line)) {
            todos.push(line);
          }
        }
      } else if (this.#templateHeading === line) {
        console.log("heading found");
        headingFound = true;
        continue;
      }
    }
    return todos;
  }
}

// Utility-function that acts as a thin wrapper around `TodoParser`
export const getTodos = ({
  lines,
  templateHeading = null,
  withChildren = false,
}) => {
  const todoParser = new TodoParser(lines, templateHeading, withChildren);
  return todoParser.getTodos();
};
