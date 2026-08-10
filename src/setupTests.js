// Registers jest-dom matchers (toBeInTheDocument, etc.) for Vitest so future
// Testing Library component tests can use them. The current suite is pure
// reducer/action logic and does not rely on these.
import '@testing-library/jest-dom';
