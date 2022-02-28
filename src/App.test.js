import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
const wrapper =  render(<App />);
expect(wrapper).toContain("Todo Application")
expect(wrapper).toContain("Toggle")
expect(wrapper).toContain("delete")
});
