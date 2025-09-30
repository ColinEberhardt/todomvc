import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for TodoMVC application
 * Encapsulates all UI interactions and provides a clean API for tests
 */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoList: Locator;
  readonly todoCount: Locator;
  readonly toggleAllCheckbox: Locator;
  readonly clearCompletedButton: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;
  readonly mainSection: Locator;
  readonly footerSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('#new-todo');
    this.todoItems = page.locator('.todo-list li');
    this.todoList = page.locator('.todo-list');
    this.todoCount = page.locator('#todo-count');
    this.toggleAllCheckbox = page.locator('#toggle-all');
    this.clearCompletedButton = page.locator('.clear-completed');
    this.filterAll = page.locator('a[href="#/all"]');
    this.filterActive = page.locator('a[href="#/active"]');
    this.filterCompleted = page.locator('a[href="#/completed"]');
    this.mainSection = page.locator('#main');
    this.footerSection = page.locator('#footer');
  }

  /**
   * Navigate to the TodoMVC application
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Add a new todo item
   * @param text - The text for the new todo item
   */
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todo items
   * @param texts - Array of texts for the todo items
   */
  async addTodos(texts: string[]) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  /**
   * Get a specific todo item by index (0-based)
   * @param index - The index of the todo item
   */
  getTodoItem(index: number): TodoItem {
    return new TodoItem(this.todoItems.nth(index));
  }

  /**
   * Get a todo item by its text content
   * @param text - The text content of the todo item
   */
  getTodoItemByText(text: string): TodoItem {
    return new TodoItem(this.todoItems.filter({ hasText: text }));
  }

  /**
   * Get the count of todo items
   */
  async getTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  /**
   * Get the count of visible todo items (accounting for filters)
   */
  async getVisibleTodoCount(): Promise<number> {
    return await this.todoItems.count();
  }

  /**
   * Get the count of completed todo items
   */
  async getCompletedTodoCount(): Promise<number> {
    return await this.page.locator('.todo-list li.completed').count();
  }

  /**
   * Get the count of active (incomplete) todo items
   */
  async getActiveTodoCount(): Promise<number> {
    const total = await this.getTodoCount();
    const completed = await this.getCompletedTodoCount();
    return total - completed;
  }

  /**
   * Toggle all todos to completed/incomplete
   */
  async toggleAllTodos() {
    await this.toggleAllCheckbox.click();
  }

  /**
   * Clear all completed todos
   */
  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  /**
   * Filter todos to show all items
   */
  async filterToAll() {
    await this.filterAll.click();
  }

  /**
   * Filter todos to show only active items
   */
  async filterToActive() {
    await this.filterActive.click();
  }

  /**
   * Filter todos to show only completed items
   */
  async filterToCompleted() {
    await this.filterCompleted.click();
  }

  /**
   * Check if the main section is visible
   */
  async isMainSectionVisible(): Promise<boolean> {
    return await this.mainSection.isVisible();
  }

  /**
   * Check if the footer section is visible
   */
  async isFooterSectionVisible(): Promise<boolean> {
    return await this.footerSection.isVisible();
  }

  /**
   * Get the text content of the todo counter
   */
  async getTodoCounterText(): Promise<string> {
    return await this.todoCount.textContent() ?? '';
  }

  /**
   * Check if the clear completed button is visible
   */
  async isClearCompletedButtonVisible(): Promise<boolean> {
    return await this.clearCompletedButton.isVisible();
  }

  /**
   * Verify that the application is in its initial empty state
   */
  async verifyInitialState() {
    await expect(this.todoItems).toHaveCount(0);
    await expect(this.mainSection).not.toBeVisible();
    await expect(this.footerSection).not.toBeVisible();
    await expect(this.newTodoInput).toBeFocused();
    await expect(this.newTodoInput).toHaveAttribute('placeholder', 'What needs to be done?');
  }
}

/**
 * Represents an individual todo item
 */
export class TodoItem {
  readonly locator: Locator;
  readonly toggle: Locator;
  readonly label: Locator;
  readonly deleteButton: Locator;
  readonly editInput: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
    this.toggle = locator.locator('.toggle');
    this.label = locator.locator('label');
    this.deleteButton = locator.locator('.destroy');
    this.editInput = locator.locator('.edit');
  }

  /**
   * Get the text content of the todo item
   */
  async getText(): Promise<string> {
    return await this.label.textContent() ?? '';
  }

  /**
   * Check if the todo item is completed
   */
  async isCompleted(): Promise<boolean> {
    const className = await this.locator.getAttribute('class');
    return className?.includes('completed') ?? false;
  }

  /**
   * Toggle the completion status of the todo item
   */
  async toggleCompletion() {
    await this.toggle.click();
  }

  /**
   * Delete the todo item
   */
  async delete() {
    await this.locator.hover();
    await this.deleteButton.click();
  }

  /**
   * Start editing the todo item
   */
  async startEdit() {
    await this.label.dblclick();
  }

  /**
   * Edit the todo item text
   * @param newText - The new text for the todo item
   */
  async edit(newText: string) {
    await this.startEdit();
    await this.editInput.fill(newText);
    await this.editInput.press('Enter');
  }

  /**
   * Cancel editing the todo item
   */
  async cancelEdit() {
    await this.startEdit();
    await this.editInput.press('Escape');
  }

  /**
   * Check if the todo item is in edit mode
   */
  async isInEditMode(): Promise<boolean> {
    const className = await this.locator.getAttribute('class');
    return className?.includes('editing') ?? false;
  }

  /**
   * Verify the todo item has the expected text
   */
  async verifyText(expectedText: string) {
    await expect(this.label).toHaveText(expectedText);
  }

  /**
   * Verify the todo item is completed
   */
  async verifyCompleted() {
    await expect(this.locator).toHaveClass(/completed/);
    await expect(this.toggle).toBeChecked();
  }

  /**
   * Verify the todo item is not completed
   */
  async verifyNotCompleted() {
    await expect(this.locator).not.toHaveClass(/completed/);
    await expect(this.toggle).not.toBeChecked();
  }
}