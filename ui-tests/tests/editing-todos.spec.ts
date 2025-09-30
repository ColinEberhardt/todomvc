import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Editing Todo Items', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Add standard set of todo items
    await todoPage.addTodos(['buy some cheese', 'feed the cat', 'book a doctors appointment']);
  });

  test('should enter edit mode with proper focus management', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1); // "feed the cat"
    
    // Double-click to enter edit mode
    await todoItem.startEdit();
    
    // Verify edit mode is active
    await expect(todoItem.locator).toHaveClass(/editing/);
    await expect(todoItem.editInput).toBeFocused();
    
    // Verify main input loses focus
    await expect(todoPage.newTodoInput).not.toBeFocused();
  });

  test('should hide other controls while editing', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    
    // Enter edit mode
    await todoItem.startEdit();
    
    // Toggle and destroy buttons should be hidden while editing
    await expect(todoItem.toggle).not.toBeVisible();
    await expect(todoItem.deleteButton).not.toBeVisible();
    
    // Label should be hidden
    await expect(todoItem.label).not.toBeVisible();
  });

  test('should save changes when pressing Enter', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const newText = 'feed the dog instead';
    
    // Edit the todo
    await todoItem.edit(newText);
    
    // Verify changes are saved and edit mode is exited
    await expect(todoItem.locator).not.toHaveClass(/editing/);
    await todoItem.verifyText(newText);
  });

  test('should cancel changes when pressing Escape', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const originalText = await todoItem.getText();
    
    // Start editing
    await todoItem.startEdit();
    await todoItem.editInput.fill('modified text');
    
    // Cancel with Escape
    await todoItem.editInput.press('Escape');
    
    // Verify original text is preserved and edit mode is exited
    await expect(todoItem.locator).not.toHaveClass(/editing/);
    await todoItem.verifyText(originalText);
  });

  test('should save changes when losing focus', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const newText = 'feed the dog instead';
    
    // Start editing
    await todoItem.startEdit();
    await todoItem.editInput.fill(newText);
    
    // Click away to lose focus
    await todoPage.newTodoInput.click();
    
    // Verify changes are saved
    await expect(todoItem.locator).not.toHaveClass(/editing/);
    await todoItem.verifyText(newText);
  });

  test('should remove todo when edited text is empty', async ({ todoPage }) => {
    const initialCount = await todoPage.getTodoCount();
    const todoItem = todoPage.getTodoItem(1);
    
    // Edit to empty text
    await todoItem.startEdit();
    await todoItem.editInput.fill('');
    await todoItem.editInput.press('Enter');
    
    // Verify todo is removed
    await expect(todoPage.todoItems).toHaveCount(initialCount - 1);
    
    // Verify remaining todos are correct
    await todoPage.getTodoItem(0).verifyText('buy some cheese');
    await todoPage.getTodoItem(1).verifyText('book a doctors appointment');
  });

  test('should remove todo when edited text is only whitespace', async ({ todoPage }) => {
    const initialCount = await todoPage.getTodoCount();
    const todoItem = todoPage.getTodoItem(1);
    
    // Edit to whitespace-only text
    await todoItem.startEdit();
    await todoItem.editInput.fill('   ');
    await todoItem.editInput.press('Enter');
    
    // Verify todo is removed
    await expect(todoPage.todoItems).toHaveCount(initialCount - 1);
  });

  test('should trim whitespace from edited text', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const newText = 'feed the dog';
    
    // Edit with extra whitespace
    await todoItem.startEdit();
    await todoItem.editInput.fill(`  ${newText}  `);
    await todoItem.editInput.press('Enter');
    
    // Verify whitespace is trimmed
    await todoItem.verifyText(newText);
  });

  test('should handle editing with special characters', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const specialText = 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
    
    await todoItem.edit(specialText);
    await todoItem.verifyText(specialText);
  });

  test('should handle editing with unicode characters', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const unicodeText = '🎯 Unicode todo with emojis 🚀';
    
    await todoItem.edit(unicodeText);
    await todoItem.verifyText(unicodeText);
  });

  test('should handle very long edited text', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const longText = 'This is a very long todo item that should test how the application handles lengthy text content when editing existing items';
    
    await todoItem.edit(longText);
    await todoItem.verifyText(longText);
  });

  test('should preserve completion status when editing', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    
    // Mark as completed first
    await todoItem.toggleCompletion();
    await todoItem.verifyCompleted();
    
    // Edit the text
    const newText = 'feed the dog instead';
    await todoItem.edit(newText);
    
    // Verify completion status is preserved
    await todoItem.verifyCompleted();
    await todoItem.verifyText(newText);
  });

  test('should handle editing multiple items in sequence', async ({ todoPage }) => {
    // Edit first item
    await todoPage.getTodoItem(0).edit('buy goat cheese');
    await todoPage.getTodoItem(0).verifyText('buy goat cheese');
    
    // Edit second item
    await todoPage.getTodoItem(1).edit('feed the dog');
    await todoPage.getTodoItem(1).verifyText('feed the dog');
    
    // Edit third item
    await todoPage.getTodoItem(2).edit('reschedule appointment');
    await todoPage.getTodoItem(2).verifyText('reschedule appointment');
    
    // Verify all changes are preserved
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('should show edit input with current todo text pre-filled', async ({ todoPage }) => {
    const todoItem = todoPage.getTodoItem(1);
    const originalText = await todoItem.getText();
    
    // Start editing
    await todoItem.startEdit();
    
    // Verify edit input contains the current text
    await expect(todoItem.editInput).toHaveValue(originalText);
  });
});