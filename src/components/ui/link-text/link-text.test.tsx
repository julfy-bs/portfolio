import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import { PATH } from '../../../constants/routes';
import { LINK_TEST_ID } from '../../../constants/tests/text-link/values';
import LinkText from './link-text';

type ElementToTestProps = {
  children?: ReactNode;
  external?: boolean;
  navigation?: boolean;
};
const testingLinkText = 'TEST';
const linkHrefAttribute = 'href';
const testingRoute = PATH.HOME;
const ElementToTest: FC<ElementToTestProps> = ({ children, navigation = false, external = false }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={testingRoute}
          element={
            <LinkText text={testingLinkText} route={testingRoute} navigation={navigation} external={external}>
              {children}
            </LinkText>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

describe('UI-компонент <LinkText /> рендерится без ошибок', () => {
  test('С обязательными параметрами.', () => {
    render(<ElementToTest />);
    const link: HTMLButtonElement = screen.getByTestId(LINK_TEST_ID);
    expect(link).toHaveTextContent(testingLinkText);
    expect(link.classList.contains('link'));
    expect(link.getAttribute(linkHrefAttribute)).toBe(testingRoute);
    expect(link).toBeInTheDocument();
    expect(link).toMatchSnapshot();
  });

  test('Рендерится с параметром navigation', () => {
    render(<ElementToTest navigation={true} />);
    const link: HTMLButtonElement = screen.getByTestId(LINK_TEST_ID);
    expect(link.classList.contains('link_role_navigation'));
    expect(link.classList.contains('link'));
    expect(link).toHaveTextContent(testingLinkText);
    expect(link.getAttribute(linkHrefAttribute)).toBe(testingRoute);
    expect(link).toBeInTheDocument();
    expect(link).toMatchSnapshot();
  });
});
