const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Set default timeout for steps
setDefaultTimeout(30 * 1000);

class TodoWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.baseUrl = 'file://' + require('path').resolve(__dirname, '../../examples/jquery/index.html');
  }

  async openBrowser() {
    const headless = process.env.HEADLESS !== 'false';
    const debug = process.env.DEBUG === 'true';
    
    this.browser = await chromium.launch({ 
      headless: headless,
      slowMo: debug ? 100 : 0,
      devtools: debug
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    
    this.page = await this.context.newPage();
    
    // Enable console logging in debug mode
    if (debug) {
      this.page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    }
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async navigateToApp() {
    await this.page.goto(this.baseUrl);
    
    // Wait for the page to load completely
    await this.page.waitForLoadState('networkidle');
    
    // Wait for jQuery and main app structure
    await this.page.waitForFunction(() => {
      return window.$ && document.querySelector('#todoapp') && document.querySelector('#new-todo');
    }, { timeout: 10000 });
    
    // Give the app a moment to fully initialize
    await this.page.waitForTimeout(1000);
  }

  // Helper methods for common operations
  async addTodo(text) {
    const input = this.page.locator('#new-todo');
    await input.fill(text);
    await input.press('Enter');
    
    // Wait for the todo to appear in the list
    await this.page.waitForSelector(`li:has-text("${text}")`, { timeout: 5000 });
  }

  async getTodoCount() {
    return await this.page.locator('#todo-list li').count();
  }

  async getTodoText(index) {
    const todos = this.page.locator('#todo-list li');
    const todo = todos.nth(index - 1); // Convert to 0-based index
    return await todo.locator('label').textContent();
  }

  async markTodoComplete(index) {
    const todos = this.page.locator('#todo-list li');
    const todo = todos.nth(index - 1);
    await todo.locator('.toggle').check();
  }

  async markTodoIncomplete(index) {
    const todos = this.page.locator('#todo-list li');
    const todo = todos.nth(index - 1);
    await todo.locator('.toggle').uncheck();
  }

  async isTodoCompleted(index) {
    const todos = this.page.locator('#todo-list li');
    const todo = todos.nth(index - 1);
    return await todo.locator('.toggle').isChecked();
  }

  async doubleClickTodo(index) {
    const todos = this.page.locator('#todo-list li');
    const todo = todos.nth(index - 1);
    await todo.locator('label').dblclick();
  }

  async editTodo(text) {
    const editInput = this.page.locator('.editing .edit');
    await editInput.fill(text);
  }

  async pressEnterOnEdit() {
    const editInput = this.page.locator('.editing .edit');
    await editInput.press('Enter');
  }

  async pressEscapeOnEdit() {
    const editInput = this.page.locator('.editing .edit');
    await editInput.press('Escape');
  }

  async clickClearCompleted() {
    await this.page.locator('.clear-completed').click();
  }

  async clickToggleAll() {
    await this.page.locator('#toggle-all').click();
  }

  async filterBy(filter) {
    const filterMap = {
      'all': 'All',
      'active': 'Active', 
      'completed': 'Completed'
    };
    
    // Get the current todo count before filtering
    const currentCount = await this.page.locator('#todo-list li').count();
    
    await this.page.locator(`a:has-text("${filterMap[filter]}")`).click();
    
    // Wait for the URL to change (hash routing)
    await this.page.waitForFunction(
      (expectedFilter) => window.location.hash.includes(expectedFilter),
      filter.toLowerCase(),
      { timeout: 5000 }
    );
    
    // Wait for the DOM to update - expect the todo count to potentially change
    await this.page.waitForTimeout(500);
  }

  async navigateBack() {
    await this.page.goBack();
  }

  // Add standard todo items for testing
  async addStandardTodos() {
    await this.addTodo('buy some cheese');
    await this.addTodo('feed the cat');
    await this.addTodo('book a doctors appointment');
  }
}

setWorldConstructor(TodoWorld);