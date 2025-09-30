import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Todo Counter', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.verifyInitialState();
  });

  test('should display correct count with proper singular/plural grammar', async ({ todoPage }) => {
    // Add first todo - should show singular "item"
    await todoPage.addTodo('buy some cheese');
    const counterText1 = await todoPage.getTodoCounterText();
    expect(counterText1).toContain('1 item left');
    
    // Add second todo - should show plural "items" 
    await todoPage.addTodo('feed the cat');
    const counterText2 = await todoPage.getTodoCounterText();
    expect(counterText2).toContain('2 items left');
  });

  test('should not be visible when there are no todos', async ({ todoPage }) => {
    // Counter should not be visible initially
    await expect(todoPage.footerSection).not.toBeVisible();
  });

  test('should only count incomplete items', async ({ todoPage }) => {
    // Add 3 todos
    await todoPage.addTodos(['buy some cheese', 'feed the cat', 'book a doctors appointment']);
    
    // Initially all should be active
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('3 items left');
    
    // Mark one as completed
    await todoPage.getTodoItem(0).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('2 items left');
    
    // Mark another as completed
    await todoPage.getTodoItem(1).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Mark the last one as completed
    await todoPage.getTodoItem(2).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('0 items left');
  });

  test('should update when items are toggled back to incomplete', async ({ todoPage }) => {
    // Add and complete all todos
    await todoPage.addTodos(['buy some cheese', 'feed the cat']);
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(1).toggleCompletion();
    
    // Should show 0 items left
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('0 items left');
    
    // Toggle one back to incomplete
    await todoPage.getTodoItem(0).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Toggle the other back to incomplete
    await todoPage.getTodoItem(1).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('2 items left');
  });

  test('should use correct grammar for edge cases', async ({ todoPage }) => {
    await todoPage.addTodo('buy some cheese');
    
    // 1 item should use singular
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    expect(counterText).not.toContain('1 items left');
    
    // Mark as complete to get 0 items
    await todoPage.getTodoItem(0).toggleCompletion();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('0 items left');
    expect(counterText).not.toContain('0 item left');
  });

  test('should update counter when todos are added dynamically', async ({ todoPage }) => {
    // Start with one todo
    await todoPage.addTodo('buy some cheese');
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Add more todos one by one and verify counter updates
    await todoPage.addTodo('feed the cat');
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('2 items left');
    
    await todoPage.addTodo('book a doctors appointment');
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('3 items left');
    
    await todoPage.addTodo('walk the dog');
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('4 items left');
  });

  test('should maintain accurate count with mixed operations', async ({ todoPage }) => {
    // Add several todos
    await todoPage.addTodos(['todo 1', 'todo 2', 'todo 3', 'todo 4', 'todo 5']);
    
    // Verify initial count
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('5 items left');
    
    // Complete some, add more, toggle others
    await todoPage.getTodoItem(0).toggleCompletion(); // 4 left
    await todoPage.getTodoItem(2).toggleCompletion(); // 3 left
    
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('3 items left');
    
    // Add more todos
    await todoPage.addTodo('todo 6'); // 4 left
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('4 items left');
    
    // Toggle completed item back to incomplete
    await todoPage.getTodoItem(0).toggleCompletion(); // 5 left
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('5 items left');
  });
});