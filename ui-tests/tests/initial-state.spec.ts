import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Initial State', () => {
  test('should display correct initial state when application loads', async ({ todoPage }) => {
    await todoPage.goto();
    
    // Verify initial state
    await todoPage.verifyInitialState();
  });

  test('should have correct placeholder text in input field', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.newTodoInput).toHaveAttribute('placeholder', 'What needs to be done?');
  });

  test('should have input field focused on load', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.newTodoInput).toBeFocused();
  });

  test('should not display main section when empty', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.mainSection).not.toBeVisible();
  });

  test('should not display footer section when empty', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.footerSection).not.toBeVisible();
  });

  test('should have empty todo list', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('should display application title', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.page.locator('h1')).toHaveText('todos');
  });

  test('should have correct document title', async ({ todoPage }) => {
    await todoPage.goto();
    
    await expect(todoPage.page).toHaveTitle('TodoMVC: jQuery');
  });

  test('should display info footer with correct links and text', async ({ todoPage }) => {
    await todoPage.goto();
    
    const infoFooter = todoPage.page.locator('#info');
    await expect(infoFooter).toBeVisible();
    
    // Check for key text content
    await expect(infoFooter).toContainText('Double-click to edit a todo');
    await expect(infoFooter).toContainText('Created by');
    await expect(infoFooter).toContainText('Part of');
    
    // Check for links
    await expect(infoFooter.locator('a[href*="todomvc.com"]')).toBeVisible();
  });

  test('should have proper ARIA attributes for accessibility', async ({ todoPage }) => {
    await todoPage.goto();
    
    // Check that main sections have proper structure
    await expect(todoPage.page.locator('#todoapp')).toBeVisible();
    await expect(todoPage.page.locator('header.header')).toBeVisible();
    
    // Input should be accessible
    await expect(todoPage.newTodoInput).toHaveAttribute('id', 'new-todo');
    await expect(todoPage.newTodoInput).toHaveAttribute('class', /new-todo/);
  });

  test('should transition to populated state when first todo is added', async ({ todoPage }) => {
    await todoPage.goto();
    
    // Verify initial empty state
    await expect(todoPage.mainSection).not.toBeVisible();
    await expect(todoPage.footerSection).not.toBeVisible();
    
    // Add first todo
    await todoPage.addTodo('first todo');
    
    // Verify transition to populated state
    await expect(todoPage.mainSection).toBeVisible();
    await expect(todoPage.footerSection).toBeVisible();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoCount).toBeVisible();
  });

  test('should return to empty state when last todo is removed', async ({ todoPage }) => {
    await todoPage.goto();
    
    // Add a todo to populate the app
    await todoPage.addTodo('temporary todo');
    await expect(todoPage.mainSection).toBeVisible();
    await expect(todoPage.footerSection).toBeVisible();
    
    // Remove the todo by editing it to empty text
    const todoItem = todoPage.getTodoItem(0);
    await todoItem.startEdit();
    await todoItem.editInput.fill('');
    await todoItem.editInput.press('Enter');
    
    // Verify return to empty state
    await expect(todoPage.todoItems).toHaveCount(0);
    await expect(todoPage.mainSection).not.toBeVisible();
    await expect(todoPage.footerSection).not.toBeVisible();
  });

  test('should maintain input field focus throughout state transitions', async ({ todoPage }) => {
    await todoPage.goto();
    
    // Input should be focused initially
    await expect(todoPage.newTodoInput).toBeFocused();
    
    // Add a todo
    await todoPage.addTodo('test todo');
    
    // Input should still be focused after adding todo
    await expect(todoPage.newTodoInput).toBeFocused();
    await expect(todoPage.newTodoInput).toHaveValue('');
  });
});