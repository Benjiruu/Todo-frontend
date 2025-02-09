const { test, expect } = require('@playwright/test');

test('Add 3 notes, check one, confirm "2 items left"', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.fill('#new-todo', 'Note 1');
  await page.press('#new-todo', 'Enter');
  await page.fill('#new-todo', 'Note 2');
  await page.press('#new-todo', 'Enter');
  await page.fill('#new-todo', 'Note 3');
  await page.press('#new-todo', 'Enter');
  let itemCount = await page.textContent('#todo-count');
  expect(itemCount).toBe('3 items left');
  await page.check('#todo-list li:nth-child(2) input[type="checkbox"]');
  itemCount = await page.textContent('#todo-count');
  expect(itemCount).toBe('2 items left');
});