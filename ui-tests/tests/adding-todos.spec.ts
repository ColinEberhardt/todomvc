import { test, expect } from '../src/fixtures/test-fixtures';
import { testData } from '../src/fixtures/test-fixtures';

test.describe('Adding New Todos', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Ensure we start with an empty todo list
    await todoPage.verifyInitialState();
  });

  test('should allow users to add multiple todo items', async ({ todoPage }) => {
    // Add first todo
    await todoPage.addTodo('buy some cheese');
    
    // Verify exactly 1 todo item appears
    await expect(todoPage.todoItems).toHaveCount(1);
    await todoPage.getTodoItem(0).verifyText('buy some cheese');
    
    // Add second todo
    await todoPage.addTodo('feed the cat');
    
    // Verify exactly 2 todo items are now visible
    await expect(todoPage.todoItems).toHaveCount(2);
    await todoPage.getTodoItem(0).verifyText('buy some cheese');
    await todoPage.getTodoItem(1).verifyText('feed the cat');
  });

  test('should clear input field after adding an item', async ({ todoPage }) => {
    await todoPage.addTodo('buy some cheese');
    
    // Check that the input field is now empty
    await expect(todoPage.newTodoInput).toHaveValue('');
    await expect(todoPage.newTodoInput).toBeFocused();
  });

  test('should add new items to the bottom of the list in correct order', async ({ todoPage }) => {
    const todos = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];
    
    // Add all todos
    await todoPage.addTodos(todos);
    
    // Verify there are exactly 3 items total
    await expect(todoPage.todoItems).toHaveCount(3);
    
    // Check that items appear in the exact order they were added
    await todoPage.getTodoItem(0).verifyText('buy some cheese');
    await todoPage.getTodoItem(1).verifyText('feed the cat'); 
    await todoPage.getTodoItem(2).verifyText('book a doctors appointment');
  });

  test('should not add empty todos', async ({ todoPage }) => {
    // Try to add empty todo
    await todoPage.newTodoInput.press('Enter');
    
    // Verify no todo was added
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.mainSection).not.toBeVisible();
  });

  test('should not add todos with only whitespace', async ({ todoPage }) => {
    // Try to add whitespace-only todo
    await todoPage.newTodoInput.fill('   ');
    await todoPage.newTodoInput.press('Enter');
    
    // Verify no todo was added
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.mainSection).not.toBeVisible();
  });

  test('should trim whitespace from todo text', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill('  buy some cheese  ');
    await todoPage.newTodoInput.press('Enter');
    
    await expect(todoPage.todoItems).toHaveCount(1);
    await todoPage.getTodoItem(0).verifyText('buy some cheese');
  });

  test('should handle special characters and unicode', async ({ todoPage }) => {
    // Test special characters
    await todoPage.addTodo(testData.todos.special);
    await todoPage.getTodoItem(0).verifyText(testData.todos.special);
    
    // Test unicode characters
    await todoPage.addTodo(testData.todos.unicode);
    await todoPage.getTodoItem(1).verifyText(testData.todos.unicode);
    
    await expect(todoPage.todoItems).toHaveCount(2);
  });

  test('should handle very long todo text', async ({ todoPage }) => {
    await todoPage.addTodo(testData.todos.long);
    await todoPage.getTodoItem(0).verifyText(testData.todos.long);
    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test('should show main section and footer after adding first todo', async ({ todoPage }) => {
    // Initially main and footer should not be visible
    await expect(todoPage.mainSection).not.toBeVisible();
    await expect(todoPage.footerSection).not.toBeVisible();
    
    // Add first todo
    await todoPage.addTodo('buy some cheese');
    
    // Main and footer should now be visible
    await expect(todoPage.mainSection).toBeVisible();
    await expect(todoPage.footerSection).toBeVisible();
  });
});