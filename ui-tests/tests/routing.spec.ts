import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Routing and Filtering', () => {
  test.beforeEach(async ({ todoPage }) => {
    // Set up mixed todo items
    await todoPage.addTodos(['buy some cheese', 'feed the cat', 'book a doctors appointment']);
    // Mark first and third items as completed
    await todoPage.getTodoItem(0).toggleCompletion();
    await todoPage.getTodoItem(2).toggleCompletion();
  });

  test('should show all items by default', async ({ todoPage }) => {
    // All items should be visible by default
    await expect(todoPage.todoItems).toHaveCount(3);
    
    // All filter should be selected
    await expect(todoPage.filterAll).toHaveClass(/selected/);
    await expect(todoPage.filterActive).not.toHaveClass(/selected/);
    await expect(todoPage.filterCompleted).not.toHaveClass(/selected/);
  });

  test('should filter to show only active items', async ({ todoPage }) => {
    // Click active filter
    await todoPage.filterToActive();
    
    // Should show only active (incomplete) items
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('feed the cat');
    
    // Active filter should be selected
    await expect(todoPage.filterActive).toHaveClass(/selected/);
    await expect(todoPage.filterAll).not.toHaveClass(/selected/);
    await expect(todoPage.filterCompleted).not.toHaveClass(/selected/);
    
    // URL should reflect the filter
    expect(todoPage.page.url()).toContain('#/active');
  });

  test('should filter to show only completed items', async ({ todoPage }) => {
    // Click completed filter
    await todoPage.filterToCompleted();
    
    // Should show only completed items
    await expect(todoPage.todoItems).toHaveCount(2);
    
    // Completed filter should be selected
    await expect(todoPage.filterCompleted).toHaveClass(/selected/);
    await expect(todoPage.filterAll).not.toHaveClass(/selected/);
    await expect(todoPage.filterActive).not.toHaveClass(/selected/);
    
    // URL should reflect the filter
    expect(todoPage.page.url()).toContain('#/completed');
  });

  test('should show all items when all filter is clicked', async ({ todoPage }) => {
    // First filter to active
    await todoPage.filterToActive();
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Then click all filter
    await todoPage.filterToAll();
    
    // Should show all items again
    await expect(todoPage.todoItems).toHaveCount(3);
    
    // All filter should be selected
    await expect(todoPage.filterAll).toHaveClass(/selected/);
    
    // URL should reflect the filter
    expect(todoPage.page.url()).toContain('#/all');
  });

  test('should maintain filter state when items are toggled', async ({ todoPage }) => {
    // Filter to active items
    await todoPage.filterToActive();
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Mark the active item as completed
    await todoPage.getTodoItem(0).toggleCompletion();
    
    // Should now show no active items
    await expect(todoPage.todoItems).toHaveCount(0);
    
    // Filter should still be active
    await expect(todoPage.filterActive).toHaveClass(/selected/);
  });

  test('should update item visibility when switching between filters', async ({ todoPage }) => {
    // Start with all filter (default)
    await expect(todoPage.todoItems).toHaveCount(3);
    
    // Switch to active filter
    await todoPage.filterToActive();
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Switch to completed filter
    await todoPage.filterToCompleted();
    await expect(todoPage.todoItems).toHaveCount(2);
    
    // Switch back to all
    await todoPage.filterToAll();
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('should handle URL navigation directly', async ({ todoPage }) => {
    // Navigate directly to active filter URL
    await todoPage.page.goto('/#/active');
    
    // Should show only active items
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.filterActive).toHaveClass(/selected/);
    
    // Navigate directly to completed filter URL
    await todoPage.page.goto('/#/completed');
    
    // Should show only completed items
    await expect(todoPage.todoItems).toHaveCount(2);
    await expect(todoPage.filterCompleted).toHaveClass(/selected/);
  });

  test('should update counter based on current filter', async ({ todoPage }) => {
    // Counter should always show active count regardless of filter
    let counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Switch to active filter - counter should remain the same
    await todoPage.filterToActive();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
    
    // Switch to completed filter - counter should still show active count
    await todoPage.filterToCompleted();
    counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('1 item left');
  });

  test('should handle edge case with no active items', async ({ todoPage }) => {
    // Mark all items as completed
    await todoPage.getTodoItem(1).toggleCompletion(); // Complete the remaining active item
    
    // Filter to active
    await todoPage.filterToActive();
    
    // Should show no items
    await expect(todoPage.todoItems).toHaveCount(0);
    
    // Counter should show 0 items left
    const counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('0 items left');
  });

  test('should handle edge case with no completed items', async ({ todoPage }) => {
    // Start with all items view first
    await todoPage.filterToAll();
    
    // Mark all completed items as active (uncomplete them)
    await todoPage.getTodoItem(0).toggleCompletion(); // Uncomplete first item
    await todoPage.getTodoItem(2).toggleCompletion(); // Uncomplete third item
    
    // Filter to completed
    await todoPage.filterToCompleted();
    
    // Should show no items
    await expect(todoPage.todoItems).toHaveCount(0);
    
    // Counter should show 3 items left
    const counterText = await todoPage.getTodoCounterText();
    expect(counterText).toContain('3 items left');
  });

  test('should handle clear completed while filtered', async ({ todoPage }) => {
    // Filter to completed items
    await todoPage.filterToCompleted();
    await expect(todoPage.todoItems).toHaveCount(2);
    
    // Clear completed items
    await todoPage.clearCompleted();
    
    // Note: The clear completed operation automatically switches to "all" filter
    // So we should verify that only the active item remains
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Verify we're now on the "all" filter
    await expect(todoPage.filterAll).toHaveClass(/selected/);
  });

  test('should handle toggle-all while filtered', async ({ todoPage }) => {
    // Filter to active items
    await todoPage.filterToActive();
    await expect(todoPage.todoItems).toHaveCount(1);
    
    // Use toggle-all to mark all as completed
    await todoPage.toggleAllTodos();
    
    // Should now show no active items
    await expect(todoPage.todoItems).toHaveCount(0);
    
    // Switch to completed filter
    await todoPage.filterToCompleted();
    
    // Should show all 3 items as completed
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test('should maintain proper filter links and styling', async ({ todoPage }) => {
    // Check that filter links have correct hrefs
    await expect(todoPage.filterAll).toHaveAttribute('href', '#/all');
    await expect(todoPage.filterActive).toHaveAttribute('href', '#/active');
    await expect(todoPage.filterCompleted).toHaveAttribute('href', '#/completed');
    
    // Test filter selection styling
    await todoPage.filterToActive();
    await expect(todoPage.filterActive).toHaveClass(/selected/);
    
    await todoPage.filterToCompleted();
    await expect(todoPage.filterCompleted).toHaveClass(/selected/);
    
    await todoPage.filterToAll();
    await expect(todoPage.filterAll).toHaveClass(/selected/);
  });

  test('should handle browser back/forward navigation', async ({ todoPage }) => {
    // Navigate through filters
    await todoPage.filterToActive();
    await todoPage.filterToCompleted();
    await todoPage.filterToAll();
    
    // Use browser back navigation
    await todoPage.page.goBack();
    await expect(todoPage.filterCompleted).toHaveClass(/selected/);
    
    await todoPage.page.goBack();
    await expect(todoPage.filterActive).toHaveClass(/selected/);
    
    // Use browser forward navigation
    await todoPage.page.goForward();
    await expect(todoPage.filterCompleted).toHaveClass(/selected/);
  });
});