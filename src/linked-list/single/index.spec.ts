import SingleLinkedList from '.';

describe('SingleLinkedList', () => {
  test('linkedList should be empty at first', () => {
    const linkedList = new SingleLinkedList();
    expect(linkedList.isEmpty()).toBeTruthy();
  });

  test('linkedList getSize() should be return 0 at first', () => {
    const linkedList = new SingleLinkedList();
    expect(linkedList.getSize()).toBe(0);
  });
});
