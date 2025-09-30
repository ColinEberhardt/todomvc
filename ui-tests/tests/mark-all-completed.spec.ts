import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Mark All Completed', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Add standard set of todo items
    await todoPage.addTodos(['buy some cheese', 'feed the cat', 'book a doctors appointment']);
  });

  test('should mark all items as completed when toggle-all is clicked', async ({ todoPage }) => {
    // Initially all items should be incomplete
    await todoPage.getTodoItem(0).verifyNotCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
    await todoPage.getTodoItem(2).verifyNotCompleted();
    
    // Click toggle-all
    await todoPage.toggleAllTodos();
    
    // All items should now be completed
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyCompleted();
    await todoPage.getTodoItem(2).verifyCompleted();
    
    // Toggle-all checkbox should be checked
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
  });

  test('should mark all items as incomplete when toggle-all is clicked on all completed items', async ({ todoPage }) => {
    // First mark all as completed
    await todoPage.toggleAllTodos();
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
    
    // Click toggle-all again
    await todoPage.toggleAllTodos();
    
    // All items should now be incomplete
    await todoPage.getTodoItem(0).verifyNotCompleted();
    await todoPage.getTodoItem(1).verifyNotCompleted();
    await todoPage.getTodoItem(2).verifyNotCompleted();
    
    // Toggle-all checkbox should be unchecked
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
  });

  test('should update toggle-all state when individual items are toggled', async ({ todoPage }) => {
    // Initially toggle-all should be unchecked
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
    
    // Mark all items individually
    await todoPage.getTodoItem(0).toggleCompletion();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked(); // Still not all completed
    
    await todoPage.getTodoItem(1).toggleCompletion();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked(); // Still not all completed
    
    await todoPage.getTodoItem(2).toggleCompletion();
    await expect(todoPage.toggleAllCheckbox).toBeChecked(); // Now all are completed
  });

  test('should uncheck toggle-all when any completed item is unchecked', async ({ todoPage }) => {
    // Mark all as completed first
    await todoPage.toggleAllTodos();
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
    
    // Uncheck one item
    await todoPage.getTodoItem(1).toggleCompletion();
    
    // Toggle-all should now be unchecked
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
    
    // Other items should remain completed
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(2).verifyCompleted();
    
    // The toggled item should be incomplete
    await todoPage.getTodoItem(1).verifyNotCompleted();
  });

  test('should work correctly when some items are already completed', async ({ todoPage }) => {
    // Mark some items as completed manually
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
    
    // Toggle-all should be unchecked since not all are completed
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
    
    // Click toggle-all to complete all
    await todoPage.toggleAllTodos();
    
    // All items should now be completed
    await todoPage.getTodoItem(0).verifyCompleted();
    await todoPage.getTodoItem(1).verifyCompleted();
    await todoPage.getTodoItem(2).verifyCompleted();
    
    // Toggle-all should be checked
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
  });

  test('should update counter correctly when using toggle-all', async ({ todoPage }) => {
    // Initially should show 3 items left
    const initialCounterText = await todoPage.getTodoCounterText();
    expect(initialCounterText).toContain('3 items left');
    
    // Mark all as completed
    await todoPage.toggleAllTodos();
    
    // Should show 0 items left
    const completedCounterText = await todoPage.getTodoCounterText();
    expect(completedCounterText).toContain('0 items left');
    
    // Mark all as incomplete again
    await todoPage.toggleAllTodos();
    
    // Should show 3 items left again
    const backToIncompleteCounterText = await todoPage.getTodoCounterText();
    expect(backToIncompleteCounterText).toContain('3 items left');
  });

  test('should handle toggle-all with single item', async ({ todoPage }) => {
    // Start fresh with just one item
    await todoPage.goto();
    await todoPage.addTodo('single todo');
    
    // Toggle-all should work with single item
    await todoPage.toggleAllTodos();
    await todoPage.getTodoItem(0).verifyCompleted();
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
    
    // Toggle back
    await todoPage.toggleAllTodos();
    await todoPage.getTodoItem(0).verifyNotCompleted();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
  });

  test('should handle toggle-all with many items', async ({ todoPage }) => {
    // Start fresh and add many items
    await todoPage.goto();
    const manyTodos = Array.from({ length: 10 }, (_, i) => `todo item ${i + 1}`);
    await todoPage.addTodos(manyTodos);
    
    // Mark all as completed
    await todoPage.toggleAllTodos();
    
    // Verify all are completed
    for (let i = 0; i < 10; i++) {
      await todoPage.getTodoItem(i).verifyCompleted();
    }
    
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
    
    // Counter should show 0 items left
    const counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('0 items left');
  });

  test('should be visible only when there are todos', async ({ todoPage }) => {
    // Start fresh
    await todoPage.goto();
    
    // Toggle-all should not be visible when no todos
    await expect(todoPage.mainSection).not.toBeVisible();
    
    // Add a todo
    await todoPage.addTodo('first todo');
    
    // Toggle-all should now be visible
    await expect(todoPage.toggleAllCheckbox).toBeVisible();
    await expect(todoPage.mainSection).toBeVisible();
  });

  test('should have correct label text', async ({ todoPage }) => {
    // Check that the label for toggle-all is correct
    const toggleAllLabel = todoPage.page.locator('label[for="toggle-all"]');
    await expect(toggleAllLabel).toHaveText('Mark all as complete');
  });
});