const { test, expect } = require('@playwright/test');

test('Add a note, confirm "1 item left", check the note, confirm "0 items left"', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.fill('#new-todo', 'Test Note');
  await page.press('#new-todo', 'Enter');
  let itemCount = await page.textContent('#todo-count');
  expect(itemCount).toBe('1 item left');
  await page.check('#todo-list li input[type="checkbox"]');
  itemCount = await page.textContent('#todo-count');
  expect(itemCount).toBe('0 items left');
});