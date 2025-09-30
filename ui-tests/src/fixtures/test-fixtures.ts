import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

/**
 * Test fixtures for TodoMVC tests
 * Provides common setup and utilities for all tests
 */
export const test = base.extend<{
  todoPage: TodoPage;
}>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';

/**
 * Common test data for consistent testing
 */
export const testData = {
  todos: {
    simple: [
      'buy some cheese',
      'feed the cat',
      'book a doctors appointment'
    ],
    extended: [
      'buy some cheese',
      'feed the cat', 
      'book a doctors appointment',
      'walk the dog',
      'pay bills',
      'clean the house'
    ],
    single: 'buy some cheese',
    empty: '',
    whitespace: '   ',
    special: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    unicode: '🎯 Unicode todo with emojis 🚀',
    long: 'This is a very long todo item that should test how the application handles lengthy text content and whether it wraps properly or truncates as expected'
  },
  
  selectors: {
    todoApp: '#todoapp',
    newTodo: '#new-todo',
    todoList: '.todo-list',
    todoItem: '.todo-list li',
    toggle: '.toggle',
    label: 'label',
    destroy: '.destroy',
    edit: '.edit',
    main: '#main',
    footer: '#footer',
    todoCount: '#todo-count',
    clearCompleted: '.clear-completed',
    toggleAll: '#toggle-all',
    filters: {
      all: 'a[href="#/all"]',
      active: 'a[href="#/active"]', 
      completed: 'a[href="#/completed"]'
    }
  }
};

/**
 * Test helper functions
 */
export class TestHelpers {
  /**
   * Create a setup with predefined todos
   */
  static async setupTodos(todoPage: TodoPage, todos: string[] = testData.todos.simple) {
    await todoPage.addTodos(todos);
    return todos;
  }

  /**
   * Create a setup with some completed todos
   */
  static async setupMixedTodos(todoPage: TodoPage) {
    const todos = testData.todos.simple;
    await todoPage.addTodos(todos);
    
    // Mark first and last as completed
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
    
    return {
      all: todos,
      completed: [todos[0], todos[2]],
      active: [todos[1]]
    };
  }

  /**
   * Verify counter text with proper grammar
   */
  static async verifyCounterText(todoPage: TodoPage, count: number) {
    const expectedText = count === 1 ? '1 item left' : `${count} items left`;
    const actualText = await todoPage.getTodoCounterText();
    return actualText.includes(expectedText);
  }

  /**
   * Wait for all animations and transitions to complete
   */
  static async waitForAnimations(page: any) {
    await page.waitForTimeout(300); // Wait for CSS transitions
  }
}