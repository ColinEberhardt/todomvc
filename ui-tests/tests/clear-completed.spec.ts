import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Clear Completed', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Add standard set of todo items and mark some as completed
    await todoPage.addTodos(['buy some cheese', 'feed the cat', 'book a doctors appointment']);
    // Mark first and third items as completed
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
  });

  test('should display clear completed button when there are completed items', async ({ todoPage }) => {
    await expect(todoPage.clearCompletedButton).toBeVisible();
    await expect(todoPage.clearCompletedButton).toHaveText('Clear completed');
  });

  test('should not display clear completed button when no items are completed', async ({ todoPage }) => {
    // Start fresh with no completed items
    await todoPage.goto();
    await todoPage.addTodos(['buy some cheese', 'feed the cat']);
    
    // Clear completed button should not be visible
    await expect(todoPage.clearCompletedButton).not.toBeVisible();
  });

  test('should remove all completed items when clicked', async ({ todoPage }) => {
    // Verify initial state: 3 total, 2 completed, 1 active
    await expect(todoPage.todoItems).toHaveCount(3);
    expect(await todoPage.getCompletedTodoCount()).toBe(2);
    expect(await todoPage.getActiveTodoCount()).toBe(1);
    
    // Click clear completed
    await todoPage.clearCompleted();
    
    // Should now have only 1 item (the active one)
    await expect(todoPage.todoItems).toHaveCount(1);
    await todoPage.getTodoItem(0).verifyText('feed the cat');
    await todoPage.getTodoItem(0).verifyNotCompleted();
  });

  test('should update counter after clearing completed items', async ({ todoPage }) => {
    // Initially should show "1 item left"
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Clear completed items
    await todoPage.clearCompleted();
    
    // Should still show "1 item left" since only the active item remains
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
  });

  test('should hide clear completed button after clearing all completed items', async ({ todoPage }) => {
    // Button should be visible initially
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Clear completed items
    await todoPage.clearCompleted();
    
    // Button should no longer be visible
    await expect(todoPage.clearCompletedButton).not.toBeVisible();
  });

  test('should handle clearing when all items are completed', async ({ todoPage }) => {
    // Mark all items as completed
    await todoPage.getTodoItem(1).toggleCompletion(); // Complete the remaining active item
    
    // Verify all are completed
    expect(await todoPage.getCompletedTodoCount()).toBe(3);
    expect(await todoPage.getActiveTodoCount()).toBe(0);
    
    // Clear completed
    await todoPage.clearCompleted();
    
    // Should have no items left
    await expect(todoPage.todoItems).toHaveCount(0);
    
    // Should return to empty state
    await expect(todoPage.mainSection).not.toBeVisible();
    await expect(todoPage.footerSection).not.toBeVisible();
  });

  test('should preserve order of remaining active items after clearing', async ({ todoPage }) => {
    // Start fresh with a specific pattern
    await todoPage.goto();
    await todoPage.addTodos(['first', 'second', 'third', 'fourth', 'fifth']);
    
    // Complete items at positions 0, 2, and 4 (first, third, fifth)
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
    await todoPage.getTodoItem(4).toggleCompletion();
    
    // Clear completed
    await todoPage.clearCompleted();
    
    // Should have 2 items left in correct order
    await expect(todoPage.todoItems).toHaveCount(2);
    await todoPage.getTodoItem(0).verifyText('second');
    await todoPage.getTodoItem(1).verifyText('fourth');
  });

  test('should work correctly with toggle-all and clear completed combination', async ({ todoPage }) => {
    // Mark all as completed using toggle-all
    await todoPage.toggleAllTodos();
    
    // Verify clear completed button is visible
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Clear all completed
    await todoPage.clearCompleted();
    
    // Should return to empty state
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.mainSection).not.toBeVisible();
    await expect(todoPage.footerSection).not.toBeVisible();
  });

  test('should handle single completed item', async ({ todoPage }) => {
    // Start fresh with single item
    await todoPage.goto();
    await todoPage.addTodo('single todo');
    await todoPage.getTodoItem(0).toggleCompletion();
    
    // Clear completed button should be visible
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Clear completed
    await todoPage.clearCompleted();
    
    // Should return to empty state
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.mainSection).not.toBeVisible();
  });

  test('should update correctly after completing more items and clearing again', async ({ todoPage }) => {
    // Clear initial completed items
    await todoPage.clearCompleted();
    
    // Should have 1 item remaining
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Add more items
    await todoPage.addTodos(['new item 1', 'new item 2']);
    
    // Complete the first item
    await todoPage.getTodoItem(0).toggleCompletion();
    
    // Clear completed button should appear
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Clear completed again
    await todoPage.clearCompleted();
    
    // Should have 2 items left
    await expect(todoPage.todoItems).toHaveCount(2);
    await todoPage.getTodoItem(0).verifyText('new item 1');
    await todoPage.getTodoItem(1).verifyText('new item 2');
  });

  test('should maintain proper button state during rapid operations', async ({ todoPage }) => {
    // Start with some completed items
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Add more items quickly
    await todoPage.addTodo('quick item 1');
    await todoPage.addTodo('quick item 2');
    
    // Button should still be visible (still have completed items)
    await expect(todoPage.clearCompletedButton).toBeVisible();
    
    // Complete new items
    await todoPage.getTodoItem(3).toggleCompletion();
    await todoPage.getTodoItem(4).toggleCompletion();
    
    // Clear all completed
    await todoPage.clearCompleted();
    
    // Should have only the originally active item
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.clearCompletedButton).not.toBeVisible();
  });
});