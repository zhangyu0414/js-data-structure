import Stack from '.';

describe('Stack', () => {
  test('Stack isEmpty()', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBeTruthy();
    stack.push(10);
    expect(stack.isEmpty()).toBeFalsy();
  });

  test('Stack getSize()', () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBeTruthy();
    for (let i = 1; i <= 10; i++) {
      stack.push(i);
      expect(stack.getSize()).toBe(i);
    }
    expect(stack.isEmpty()).toBeFalsy();
  });

  test('Stack getTop()', () => {
    const stack = new Stack();
    expect(() => {
      stack.getTop();
    }).toThrow('当前栈中没有元素!');
    stack.push(99);
    expect(stack.getTop()).toBe(99);
    stack.push(100);
    expect(stack.getTop()).toBe(100);
  });

  test('Stack push()', () => {
    const stack = new Stack();
    for (let i = 1; i <= 10; i++) {
      stack.push(i);
      expect(stack.getTop()).toBe(i);
    }
  });

  test('Stack pop()', () => {
    const stack = new Stack();
    for (let i = 1; i <= 10; i++) {
      stack.push(i);
      expect(stack.pop()).toBe(i);
    }
    expect(() => {
      stack.pop();
    }).toThrow('当前栈中没有元素!');
  });
});
