import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Setup Verification', () => {
  test('should load TodoMVC application successfully', async ({ todoPage }) => {
    // Verify the page loads and has the expected structure
    await expect(todoPage.page.locator('h1')).toHaveText('todos');
    await expect(todoPage.newTodoInput).toBeVisible();
    await expect(todoPage.newTodoInput).toHaveAttribute('placeholder', 'What needs to be done?');
    
    // Test basic functionality
    await todoPage.addTodo('test todo');
    await expect(todoPage.todoItems).toHaveCount(1);
    await todoPage.getTodoItem(0).verifyText('test todo');
  });
});