import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Individual Todo Items', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Start with an empty todo list
    await todoPage.verifyInitialState();
  });

  test('should mark items as complete while preserving status of others', async ({ todoPage }) => {
    // Add two todo items
    await todoPage.addTodo('buy some cheese');
    await todoPage.addTodo('feed the cat');
    
    // Mark first item as complete
    await todoPage.getTodoItem(0).toggleCompletion();
    
    // Verify first item is completed and second remains incomplete
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
    
    // Mark second item as complete
    await todoPage.getTodoItem(1).toggleCompletion();
    
    // Verify both items are now completed
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyCompleted();
  });

  test('should unmark completed items and return them to incomplete status', async ({ todoPage }) => {
    // Add two todo items
    await todoPage.addTodo('buy some cheese');
    await todoPage.addTodo('feed the cat');
    
    // Mark first item as complete
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
    
    // Unmark first item (toggle it back to incomplete)
    await todoPage.getTodoItem(0).toggleCompletion();
    
    // Verify first item is now incomplete and second remains incomplete
    await todoPage.getTodoItem(0).verifyNotCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
  });

  test('should show visual distinction between complete and incomplete states', async ({ todoPage }) => {
    await todoPage.addTodo('buy some cheese');
    const todoItem = todoPage.getTodoItem(0);
    
    // Initially should be incomplete
    await expect(todoItem.locator).not.toHaveClass(/completed/);
    await expect(todoItem.toggle).not.toBeChecked();
    
    // Mark as complete
    await todoItem.toggleCompletion();
    
    // Should now show completed state
    await expect(todoItem.locator).toHaveClass(/completed/);
    await expect(todoItem.toggle).toBeChecked();
  });

  test('should handle multiple items with mixed completion states', async ({ todoPage }) => {
    const todos = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];
    await todoPage.addTodos(todos);
    
    // Mark first and third items as complete
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
    
    // Verify completion states
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
    await todoPage.getTodoItem(2).verifyCompleted();
    
    // Verify counts
    expect(await todoPage.getCompletedTodoCount()).toBe(2);
    expect(await todoPage.getActiveTodoCount()).toBe(1);
  });

  test('should persist completion state when toggling multiple times', async ({ todoPage }) => {
    await todoPage.addTodo('buy some cheese');
    const todoItem = todoPage.getTodoItem(0);
    
    // Toggle multiple times
    await todoItem.toggleCompletion(); // complete
    await todoItem.verifyCompleted();
    
    await todoItem.toggleCompletion(); // incomplete
    await todoItem.verifyNotCompleted();
    
    await todoItem.toggleCompletion(); // complete again
    await todoItem.verifyCompleted();
    
    await todoItem.toggleCompletion(); // incomplete again
    await todoItem.verifyNotCompleted();
  });

  test('should handle completion toggle on items with special characters', async ({ todoPage }) => {
    const specialText = 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
    await todoPage.addTodo(specialText);
    
    const todoItem = todoPage.getTodoItem(0);
    await todoItem.verifyText(specialText);
    
    // Toggle completion
    await todoItem.toggleCompletion();
    await todoItem.verifyCompleted();
    await todoItem.verifyText(specialText); // Text should remain unchanged
  });

  test('should handle completion toggle on very long todo items', async ({ todoPage }) => {
    const longText = 'This is a very long todo item that should test how the application handles lengthy text content and whether it wraps properly or truncates as expected';
    await todoPage.addTodo(longText);
    
    const todoItem = todoPage.getTodoItem(0);
    await todoItem.toggleCompletion();
    await todoItem.verifyCompleted();
    await todoItem.verifyText(longText);
  });
});